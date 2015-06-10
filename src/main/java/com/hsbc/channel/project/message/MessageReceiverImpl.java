/**
 * 
 */
package com.hsbc.channel.project.message;

import java.io.Serializable;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Queue;
import javax.jms.TextMessage;

import org.apache.log4j.Logger;
import org.springframework.jms.core.JmsTemplate;

/**
 * @author garfieldying
 *
 */
public class MessageReceiverImpl implements Serializable {

	private static final long serialVersionUID = 7215547943992788874L;

	private static final Logger LOGGER = Logger.getLogger(MessageReceiverImpl.class);

	private JmsTemplate jmsTemplate;
	
	public String receiveMessage(final String messageSelector, final Queue replyQueue) {
		String response = null;
		
		Message message = jmsTemplate.receiveSelected(replyQueue, messageSelector);
		
		if(message instanceof TextMessage) {
			try {
				response = ((TextMessage) message).getText();
			} catch(JMSException e) {
				if(replyQueue != null) {
					LOGGER.error("Cannnot receive the message from queue: " + replyQueue.toString(), e);
				} else {
					LOGGER.error("Receive Queue is empty.");
				}
			}
		}
		return response;
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
