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
package com.sky.test.kabeja.dxf.helpers;

public class DXFMLineSegmentElement {
    protected double[] lengthParameters;
    protected double[] fillParameters;

    public double[] getLengthParameters() {
        return lengthParameters;
    }

    public void setLengthParameters(double[] lengthParameters) {
        this.lengthParameters = lengthParameters;
    }

    public void setLengthParameter(int index, double v) {
        this.lengthParameters[index] = v;
    }

    public double[] getFillParameters() {
        return fillParameters;
    }

    public void setFillParameters(double[] fillParameters) {
        this.fillParameters = fillParameters;
    }

    public void setFillParameter(int index, double v) {
        this.fillParameters[index] = v;
    }
}
