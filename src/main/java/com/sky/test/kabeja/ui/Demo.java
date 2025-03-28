/*
   Copyright 2008 Simon Mieth

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
package com.sky.test.kabeja.ui;

import java.awt.Dimension;

import javax.swing.JFrame;

import com.sky.test.kabeja.dxf.DXFDocument;
import com.sky.test.kabeja.dxf.DXFEntity;
import com.sky.test.kabeja.parser.Parser;
import com.sky.test.kabeja.parser.ParserBuilder;
import com.sky.test.kabeja.svg.ui.SVGViewUIComponent;

import com.sky.test.abj.svg.action.HighlightAction;


public class Demo {
    /**
     * @param args
     */
    public static void main(String[] args) {
        Parser p = ParserBuilder.createDefaultParser();

        try {
            p.parse("samples/dxf/draft4.dxf");

            DXFDocument doc = p.getDocument();
            DXFEntity e = doc.getDXFEntityByID("406F");

            //  Bounds b = e.getBounds();
            System.out.println("e=" + e);

            SVGViewUIComponent ui = new SVGViewUIComponent();
            ui.addAction(new HighlightAction("GG"));

            JFrame f = new JFrame("Demo");
            f.add(ui.getView());
            f.setSize(new Dimension(640, 480));
            f.setVisible(true);
            ui.showDXFDocument(doc);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
