package <%= package %>

import org.junit.Assert.assertEquals
import org.junit.Test

class HelloTest {
    @Test fun testAssert(): Unit {
        assertEquals("Something", "Something")
    }
}
