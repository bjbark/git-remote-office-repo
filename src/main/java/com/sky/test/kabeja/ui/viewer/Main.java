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
package com.sky.test.kabeja.ui.viewer;

import java.io.File;


/**
 * @author <a href="mailto:simon.mieth@gmx.de">Simon Mieth</a>
 *
 */
public class Main {
    /**
     *
     */
    public Main() {
        super();
    }

    public static void main(String[] args) {
        SVGViewer viewer = new SVGViewer();
        viewer.initialize();

        if (args.length > 0) {
            viewer.load(new File(args[0]));
        }
    }
}
