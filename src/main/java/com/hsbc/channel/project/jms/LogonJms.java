/**
 * 
 */
package com.hsbc.channel.project.jms;

import java.io.Serializable;
import java.util.UUID;

import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.TextMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.SessionCallback;
import org.springframework.jms.support.JmsUtils;
import org.springframework.jms.support.destination.DestinationResolver;

/**
 * @author garfieldying
 * @see http://codedependents.com/2010/03/04/synchronous-request-response-with-activemq-and-spring/
 *
 */
public class LogonJms implements Serializable {

	private static final long serialVersionUID = -5346728183588392334L;

	private static final class ProducerConsumer implements SessionCallback<Message> {
		
		private static final int TIMEOUT = 5000;
		 
        private final String msg;
 
        private final DestinationResolver destinationResolver;
 
        private final String queue;
 
        public ProducerConsumer(final String msg, String queue, final DestinationResolver destinationResolver) {
            this.msg = msg;
            this.queue = queue;
            this.destinationResolver = destinationResolver;
        }
 
        public Message doInJms(final Session session) throws JMSException {
            MessageConsumer consumer = null;
            MessageProducer producer = null;
            try {
                final String correlationId = UUID.randomUUID().toString();
                final Destination requestQueue = destinationResolver.resolveDestinationName(session, queue+".request", false);
                final Destination replyQueue = destinationResolver.resolveDestinationName(session, queue+".response", false);
                // Create the consumer first!
                consumer = session.createConsumer(replyQueue, "JMSCorrelationID = '" + correlationId + "'");
                final TextMessage textMessage = session.createTextMessage(msg);
                textMessage.setJMSCorrelationID(correlationId);
                textMessage.setJMSReplyTo(replyQueue);
                // Send the request second!
                producer = session.createProducer(requestQueue);
                producer.send(requestQueue, textMessage);
                // Block on receiving the response with a timeout
                return consumer.receive(TIMEOUT);
            }
            finally {
                // Don't forget to close your resources
                JmsUtils.closeMessageConsumer(consumer);
                JmsUtils.closeMessageProducer(producer);
            }
        }
    }
 
    private final JmsTemplate jmsTemplate;
 
    @Autowired
    public LogonJms(final JmsTemplate jmsTemplate) {
        this.jmsTemplate = jmsTemplate;
     }
 
    public Message request(final String request, String queue) {
        // Must pass true as the second param to start the connection
        return jmsTemplate.execute(new ProducerConsumer(request, queue, jmsTemplate.getDestinationResolver() ), true);
    }
}
