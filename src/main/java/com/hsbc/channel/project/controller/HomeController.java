/**
 * 
 */
package com.hsbc.channel.project.controller;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.hsbc.channel.project.entity.Spittle;
import com.hsbc.channel.project.service.SpittlerService;

/**
 * @author garfieldying
 *
 */
@Controller
@RequestMapping("/home")
public class HomeController implements Serializable {

	private static final long serialVersionUID = 7531577410455250196L;
	
	private static final Logger LOGGER = Logger.getLogger(HomeController.class);

	public static final int DEFAULT_SPITTLES_PER_PAGE = 25;
	
	@Autowired
	private SpittlerService spittlerService;

	@RequestMapping("/home")
	public ModelAndView showHomePage() {
		LOGGER.info("Go through HOME Controller!");
		
		List<Spittle> spittleList = new ArrayList<Spittle>();
		spittleList = this.spittlerService.getRecentSpittles(DEFAULT_SPITTLES_PER_PAGE);
		
		ModelAndView model = new ModelAndView();
		model.setViewName("home");
		model.addObject("spittles", spittleList);
		
		if(LOGGER.isDebugEnabled()) {
			if(spittleList != null && spittleList.size() > 0) {
				LOGGER.debug("Number of spittler returned: " + spittleList.size());
			} else {
				LOGGER.debug("There is no spittler returned!");
			}
		}
		
		return model;
	}

	/**
	 * @param spittlerService the spittlerService to set
	 */
	public void setSpittlerService(SpittlerService spittlerService) {
		this.spittlerService = spittlerService;
	}
}
