/**
 * 
 */
package com.hsbc.channel.project.message;

import java.io.Serializable;

import javax.jms.JMSException;
import javax.jms.Queue;

import org.apache.log4j.Logger;
import org.springframework.jms.core.JmsTemplate;

/**
 * @author garfieldying
 *
 */
public class MessageSenderImpl implements Serializable {

	private static final long serialVersionUID = 1874002025892291245L;

	private static final Logger LOGGER = Logger.getLogger(MessageSenderImpl.class);

	private JmsTemplate jmsTemplate;
	
	public String sendMessage(final String message, final Queue sendQueue, final Queue replyQueue) {
		GenericMessageCreator creator = new GenericMessageCreator(message, replyQueue);
		this.jmsTemplate.send(sendQueue, creator);
		
		try {
			return creator.getMessageId();
		} catch(JMSException e) {
			if(sendQueue != null) {
				LOGGER.error("Cannot send message to queue: " + sendQueue.toString(), e);
			} else {
				LOGGER.error("Send Queue is empty", e);
			}
		}
		return null;
	}

	/**
	 * @return the jmsTemplate
	 */
	public JmsTemplate getJmsTemplate() {
		return jmsTemplate;
	}

	/**
	 * @param jmsTemplate the jmsTemplate to set
	 */
	public void setJmsTemplate(JmsTemplate jmsTemplate) {
		this.jmsTemplate = jmsTemplate;
	}
}
