/**
 * 
 */
package com.hsbc.channel.project.jms;

import java.io.Serializable;

import javax.jms.Queue;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.hsbc.channel.project.message.MessageReceiverImpl;
import com.hsbc.channel.project.message.MessageSenderImpl;

/**
 * @author garfieldying
 *
 */
@Component
public class LogonSyncJms implements Serializable {

	private static final long serialVersionUID = 8297045490231050149L;

	private static final Logger LOGGER = Logger.getLogger(LogonSyncJms.class);
	
	private MessageReceiverImpl receiver;
	
	private MessageSenderImpl sender;
	
	private Queue requestQueue;
	
	private Queue replyQueue;
	
	/**
	 * Exchange message with message queue channels.
	 * @param messageText the request message
	 * @return received message from server
	 */
	public String exchangeMessage(String messageText) {
		
		String messageId = sender.sendMessage(messageText, this.requestQueue, this.replyQueue);
		
		StringBuffer correlationIdBuf = new StringBuffer("JMSCorrelationID='").append(messageId).append("'");
		
		String replyText = null;
		if(messageId != null) {
			replyText = receiver.receiveMessage(correlationIdBuf.toString(), this.replyQueue);
		} else {
			LOGGER.warn("Message Id is empty!");
		}
		return replyText;
	}

	/**
	 * @return the receiver
	 */
	public MessageReceiverImpl getReceiver() {
		return receiver;
	}

	/**
	 * @param receiver the receiver to set
	 */
	public void setReceiver(MessageReceiverImpl receiver) {
		this.receiver = receiver;
	}

	/**
	 * @return the sender
	 */
	public MessageSenderImpl getSender() {
		return sender;
	}

	/**
	 * @param sender the sender to set
	 */
	public void setSender(MessageSenderImpl sender) {
		this.sender = sender;
	}

	/**
	 * @return the requestQueue
	 */
	public Queue getRequestQueue() {
		return requestQueue;
	}

	/**
	 * @param requestQueue the requestQueue to set
	 */
	public void setRequestQueue(Queue requestQueue) {
		this.requestQueue = requestQueue;
	}

	/**
	 * @return the replyQueue
	 */
	public Queue getReplyQueue() {
		return replyQueue;
	}

	/**
	 * @param replyQueue the replyQueue to set
	 */
	public void setReplyQueue(Queue replyQueue) {
		this.replyQueue = replyQueue;
	}
}
