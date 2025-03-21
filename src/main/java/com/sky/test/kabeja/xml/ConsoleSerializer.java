/*
 * Created on 28.11.2005
 *
 */
package com.sky.test.kabeja.xml;

import java.io.OutputStream;


/**
 * @author simon
 *
 */
public class ConsoleSerializer extends SAXPrettyOutputter {
    /* (non-Javadoc)
     * @see com.sky.test.kabeja.xml.SAXSerializer#setOutput(java.io.OutputStream)
     */
    public void setOutput(OutputStream out) {
        //switch output to console
        super.setOutput(System.out);
    }
}
