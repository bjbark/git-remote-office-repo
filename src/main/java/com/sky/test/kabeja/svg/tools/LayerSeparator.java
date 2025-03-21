/*
   Copyright 2005 Simon Mieth

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
package com.sky.test.kabeja.svg.tools;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Iterator;
import org.apache.commons.lang.StringUtils;

import com.sky.test.kabeja.dxf.Bounds;
import com.sky.test.kabeja.dxf.DXFDocument;
import com.sky.test.kabeja.dxf.DXFHeader;
import com.sky.test.kabeja.dxf.DXFLayer;
import com.sky.test.kabeja.dxf.DXFVariable;
import com.sky.test.kabeja.parser.DXFParser;
import com.sky.test.kabeja.parser.Parser;
import com.sky.test.kabeja.parser.ParserBuilder;
import com.sky.test.kabeja.svg.SVGConstants;
import com.sky.test.kabeja.svg.SVGGenerator;
import com.sky.test.kabeja.xml.SAXGenerator;
import com.sky.test.kabeja.xml.SAXPrettyOutputter;


/**
 * @author <a href="mailto:simon.mieth@gmx.de">Simon Mieth</a>
 *
 */
public class LayerSeparator {
    public static void main(String[] args) {
        LayerSeparator split = new LayerSeparator();

        if (args.length >= 2) {
            split.processFile(args[0], args[1]);
        } else {
            split.processFile(args[0], null);
        }
    }

    public void processFile(String source, String result) {
        if (result == null) {
            result = source.substring(0,
                    source.toLowerCase().lastIndexOf(".dxf"));
        }

        Parser parser = ParserBuilder.createDefaultParser();

        try {
            parser.parse(new FileInputStream(source), DXFParser.DEFAULT_ENCODING);

            DXFDocument doc = parser.getDocument();
            splitLayers(doc, result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void splitLayers(DXFDocument doc, String basename) {
        Iterator i = doc.getDXFLayerIterator();

        ArrayList layers = new ArrayList();

        // remove all layers from the doc
        Bounds b = doc.getBounds();

        while (i.hasNext()) {
            DXFLayer l = (DXFLayer) i.next();
            layers.add(l);
            i.remove();
        }

        //set fixed bounds
        DXFHeader h = doc.getDXFHeader();
        DXFVariable v = new DXFVariable("$PLIMMIN");
        v.setValue("10", StringUtils.EMPTY + b.getMinimumX());
        v.setValue("20", StringUtils.EMPTY + b.getMinimumY());
        h.setVariable(v);

        v = new DXFVariable("$PLIMMAX");
        v.setValue("10", StringUtils.EMPTY + b.getMaximumX());
        v.setValue("20", StringUtils.EMPTY + b.getMaximumY());
        h.setVariable(v);

        System.out.println(layers.size() + " layers to separate.");
        i = layers.iterator();

        int count = 0;

        while (i.hasNext()) {
            DXFLayer l = (DXFLayer) i.next();
            doc.addDXFLayer(l);
            count++;
            System.out.println("Generate:" + basename + count + ".svg");
            output(doc, basename + count + ".svg");
            doc.removeDXFLayer(l.getName());
        }
    }

    public void output(DXFDocument doc, String file) {
        try {
            SAXPrettyOutputter writer = new SAXPrettyOutputter(new FileOutputStream(
                        file), SAXPrettyOutputter.DEFAULT_ENCODING);
            writer.setDTD(SVGConstants.SVG_DTD_1_0);

            SAXGenerator svgGenerator = new SVGGenerator();
            svgGenerator.generate(doc, writer, null);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
