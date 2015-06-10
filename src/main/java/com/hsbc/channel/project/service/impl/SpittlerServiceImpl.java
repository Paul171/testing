/**
 * 
 */
package com.hsbc.channel.project.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hsbc.channel.project.entity.Spittle;
import com.hsbc.channel.project.service.SpittlerService;

/**
 * @author garfieldying
 *
 */
@Service
public class SpittlerServiceImpl implements SpittlerService {

	private static final long serialVersionUID = -484172220957832201L;

	/**
	 * Get recent active spittles.
	 * @param max the number of maximum spittles can be returned.
	 * @return a list of spittles not more than the max
	 */
	public List<Spittle> getRecentSpittles(int max) {
		List<Spittle> spittleList = new ArrayList<Spittle>();
		for(int i = 0; i < 10; i++) {
			spittleList.add(this.generateSpittle(i + 1));
		}
		return spittleList;
	}

	/**
	 * Generate a dummy spittle instance.
	 * @param index used of id
	 * @return a new spittle
	 */
	private Spittle generateSpittle(int index) {
		Spittle s = new Spittle();
		s.setId(index);
		s.setName("Spittle " + index);
		
		return s;
	}
}
