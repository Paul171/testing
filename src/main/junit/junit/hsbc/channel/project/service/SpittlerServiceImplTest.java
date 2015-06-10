/**
 * 
 */
package junit.hsbc.channel.project.service;

import java.util.List;

import org.apache.log4j.Logger;
import org.easymock.EasyMockRunner;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.hsbc.channel.project.entity.Spittle;
import com.hsbc.channel.project.service.SpittlerService;
import com.hsbc.channel.project.service.impl.SpittlerServiceImpl;

import junit.framework.TestCase;

/**
 * @author garfieldying
 *
 */
@RunWith(EasyMockRunner.class)
public class SpittlerServiceImplTest extends TestCase {
	
	private static final Logger LOGGER = Logger.getLogger(SpittlerServiceImplTest.class);
	
	private SpittlerService testService = new SpittlerServiceImpl();

	/* (non-Javadoc)
	 * @see junit.framework.TestCase#setupBeforeClass() 
	 */
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		LOGGER.info("Run setupBeforeClass");
	}
	
	/* (non-Javadoc)
	 * @see junit.framework.TestCase#tearDownAfterClass() 
	 */
	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		LOGGER.info("Run tearDownAfterClass");
	}

	
	/* (non-Javadoc)
	 * @see junit.framework.TestCase#setUp()
	 */
	@Before
	public void setUp() throws Exception {
		super.setUp();
		LOGGER.info("Run setUp");
	}

	/* (non-Javadoc)
	 * @see junit.framework.TestCase#tearDown()
	 */
	@After
	public void tearDown() throws Exception {
		super.tearDown();
		LOGGER.info("Run tearDown");
	}

	/**
	 * Test method for {@link com.hsbc.channel.project.service.impl.SpittlerServiceImpl#getRecentSpittles(int)}.
	 */
	@Test
	public void testGetRecentSpittles() {
		List<Spittle> list = testService.getRecentSpittles(10);
		Assert.assertNotNull(list);
		Assert.assertNotEquals(0, list.size());
		Assert.assertEquals(10, list.size());
	}
	
	/**
	 * Test method for {@link com.hsbc.channel.project.service.impl.SpittlerServiceImpl#getRecentSpittles(int)}.
	 */
	@Test
	public void testGetRecentSpittlesWithException() {
		fail("Not yet implemented");
	}

}
