/**
 * 
 */
package com.hsbc.channel.project.message;

import java.io.Serializable;

import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;

import org.springframework.jms.core.MessageCreator;

/**
 * @author garfieldying
 *
 */
public class GenericMessageCreator implements MessageCreator, Serializable {

	private static final long serialVersionUID = -6663250143332058683L;

	private Message message = null;
	
	private String correlId = null;
	
	private String messageText = null;
	
	private Destination replyToQueue = null;
	
	/**
	 * @param message
	 * @param messageText
	 */
	public GenericMessageCreator(String messageText, Destination replyToQueue) {
		this(messageText, null, replyToQueue);
	}
	
	/**
	 * @param message
	 * @param correlId
	 * @param messageText
	 */
	public GenericMessageCreator(String messageText, String correlId, Destination replyToQueue) {
		super();
		this.correlId = correlId;
		this.messageText = messageText;
		this.replyToQueue = replyToQueue;
	}

	/* (non-Javadoc)
	 * @see org.springframework.jms.core.MessageCreator#createMessage(javax.jms.Session)
	 */
	public Message createMessage(Session session) throws JMSException {
		message = session.createTextMessage(this.messageText);
		message.setJMSCorrelationID(this.correlId);
		message.setJMSReplyTo(this.replyToQueue);
		return message;
	}

	/**
	 * @return the messageId
	 * @throws JMSException
	 */
	public String getMessageId() throws JMSException {
		if(this.message != null) {
			return this.message.getJMSMessageID();
		}
		return null;
	}
	
	/**
	 * @return the replyToQueue
	 */
	public Destination getReplyToQueue() {
		return replyToQueue;
	}

	/**
	 * @param replyToQueue the replyToQueue to set
	 */
	public void setReplyToQueue(Destination replyToQueue) {
		this.replyToQueue = replyToQueue;
	}
}
