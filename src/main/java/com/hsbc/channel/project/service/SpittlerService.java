/**
 * 
 */
package com.hsbc.channel.project.service;

import java.io.Serializable;
import java.util.List;

import com.hsbc.channel.project.entity.Spittle;

/**
 * @author garfieldying
 *
 */
public interface SpittlerService extends Serializable {

	/**
	 * Get recent active spittles.
	 * @param max the number of maximum spittles can be returned.
	 * @return a list of spittles not more than the max
	 */
	public List<Spittle> getRecentSpittles(int max);
}
