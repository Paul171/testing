/**
 * 
 */
package junit.hsbc.channel.project.controller;

import static org.easymock.EasyMock.*;

import java.util.ArrayList;
import java.util.List;

import org.easymock.EasyMockRunner;
import org.easymock.Mock;
import org.easymock.TestSubject;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.web.servlet.ModelAndView;

import com.hsbc.channel.project.controller.HomeController;
import com.hsbc.channel.project.entity.Spittle;
import com.hsbc.channel.project.service.SpittlerService;

/**
 * @author garfieldying
 *
 */
@RunWith(EasyMockRunner.class)
public class HomeControllerTest {
	
	@TestSubject
	private HomeController testController = new HomeController();
	
	@Mock
	private SpittlerService mockSpittlerService;
	
	/* (non-Javadoc)
	 * @see junit.framework.TestCase#setUp()
	 */
	@Before
	public void setUp() throws Exception {
		List<Spittle> list = new ArrayList<Spittle>();
		for(int i = 0; i < 10; i ++) {
			Spittle s = new Spittle();
			s.setId((i + 1));
			s.setName("Spittle " + (i + 1));
			list.add(s);
		}
		expect(mockSpittlerService.getRecentSpittles(HomeController.DEFAULT_SPITTLES_PER_PAGE)).andReturn(list);
	}

	/**
	 * Test method for {@link com.hsbc.channel.project.controller.HomeController#showHomePage()}.
	 */
	@Test
	public final void testShowHomePage() {
		replay(mockSpittlerService);
		ModelAndView model = testController.showHomePage();
		Assert.assertNotNull(model);
		Assert.assertEquals("home", model.getViewName());
		Assert.assertEquals(10, ((List<?>) model.getModel().get("spittles")).size());
	}

}
