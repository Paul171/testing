/**
 * 
 */
package com.hsbc.channel.project.entity;

import java.io.Serializable;
import java.util.Properties;

/**
 * @author garfieldying
 *
 */
public class LogonMessage implements Serializable {

	private static final long serialVersionUID = -3074763515813199302L;

	private int id;

	private String userName;
	
	private String password;
	
	private String userType;
	
	private String sessionId;

	public LogonMessage(Properties message) {
		this.id = Integer.valueOf(message.getProperty("id"));
		this.userName = message.getProperty("name", "");
		this.userType = message.getProperty("type", "");
		this.sessionId = message.getProperty("session", "");
	}
	
	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}

	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the userType
	 */
	public String getUserType() {
		return userType;
	}

	/**
	 * @param userType the userType to set
	 */
	public void setUserType(String userType) {
		this.userType = userType;
	}

	/**
	 * @return the sessionId
	 */
	public String getSessionId() {
		return sessionId;
	}

	/**
	 * @param sessionId the sessionId to set
	 */
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		LogonMessage other = (LogonMessage) obj;
		if (id != other.id)
			return false;
		return true;
	}
}
