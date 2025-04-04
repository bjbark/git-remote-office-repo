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
package com.sky.test.kabeja.dxf;

/**
 * @author <a href="mailto:simon.mieth@gmx.de>Simon Mieth</a>
 * @author <a href="mailto:michele.franzin@gmail.com>Michele Franzin</a>
 *
 * taken from http://www.isctex.com/acadcolors.php
 */
public class DXFColor {

    private static final String[] rgbs = {
        /* 0 */"0,0,0",
        /* 1 */ "255,0,0",
        /* 2 */ "255,255,0",
        /* 3 */ "0,255,0",
        /* 4 */ "0,255,255",
        /* 5 */ "0,0,255",
        /* 6 */ "255,0,255",
        /* 7 */ "255,255,255",
        /* 8 */ "65,65,65",
        /* 9 */ "128,128,128",
        /* 10 */ "255,0,0",
        /* 11 */ "255,170,170",
        /* 12 */ "189,0,0",
        /* 13 */ "189,126,126",
        /* 14 */ "129,0,0",
        /* 15 */ "129,86,86",
        /* 16 */ "104,0,0",
        /* 17 */ "104,69,69",
        /* 18 */ "79,0,0",
        /* 19 */ "79,53,53",
        /* 20 */ "255,63,0",
        /* 21 */ "255,191,170",
        /* 22 */ "189,46,0",
        /* 23 */ "189,141,126",
        /* 24 */ "129,31,0",
        /* 25 */ "129,96,86",
        /* 26 */ "104,25,0",
        /* 27 */ "104,78,69",
        /* 28 */ "79,19,0",
        /* 29 */ "79,59,53",
        /* 30 */ "255,127,0",
        /* 31 */ "255,212,170",
        /* 32 */ "189,94,0",
        /* 33 */ "189,157,126",
        /* 34 */ "129,64,0",
        /* 35 */ "129,107,86",
        /* 36 */ "104,52,0",
        /* 37 */ "104,86,69",
        /* 38 */ "79,39,0",
        /* 39 */ "79,66,53",
        /* 40 */ "255,191,0",
        /* 41 */ "255,234,170",
        /* 42 */ "189,141,0",
        /* 43 */ "189,173,126",
        /* 44 */ "129,96,0",
        /* 45 */ "129,118,86",
        /* 46 */ "104,78,0",
        /* 47 */ "104,95,69",
        /* 48 */ "79,59,0",
        /* 49 */ "79,73,53",
        /* 50 */ "255,255,0",
        /* 51 */ "255,255,170",
        /* 52 */ "189,189,0",
        /* 53 */ "189,189,126",
        /* 54 */ "129,129,0",
        /* 55 */ "129,129,86",
        /* 56 */ "104,104,0",
        /* 57 */ "104,104,69",
        /* 58 */ "79,79,0",
        /* 59 */ "79,79,53",
        /* 60 */ "191,255,0",
        /* 61 */ "234,255,170",
        /* 62 */ "141,189,0",
        /* 63 */ "173,189,126",
        /* 64 */ "96,129,0",
        /* 65 */ "118,129,86",
        /* 66 */ "78,104,0",
        /* 67 */ "95,104,69",
        /* 68 */ "59,79,0",
        /* 69 */ "73,79,53",
        /* 70 */ "127,255,0",
        /* 71 */ "212,255,170",
        /* 72 */ "94,189,0",
        /* 73 */ "157,189,126",
        /* 74 */ "64,129,0",
        /* 75 */ "107,129,86",
        /* 76 */ "52,104,0",
        /* 77 */ "86,104,69",
        /* 78 */ "39,79,0",
        /* 79 */ "66,79,53",
        /* 80 */ "63,255,0",
        /* 81 */ "191,255,170",
        /* 82 */ "46,189,0",
        /* 83 */ "141,189,126",
        /* 84 */ "31,129,0",
        /* 85 */ "96,129,86",
        /* 86 */ "25,104,0",
        /* 87 */ "78,104,69",
        /* 88 */ "19,79,0",
        /* 89 */ "59,79,53",
        /* 90 */ "0,255,0",
        /* 91 */ "170,255,170",
        /* 92 */ "0,189,0",
        /* 93 */ "126,189,126",
        /* 94 */ "0,129,0",
        /* 95 */ "86,129,86",
        /* 96 */ "0,104,0",
        /* 97 */ "69,104,69",
        /* 98 */ "0,79,0",
        /* 99 */ "53,79,53",
        /* 100 */ "0,255,63",
        /* 101 */ "170,255,191",
        /* 102 */ "0,189,46",
        /* 103 */ "126,189,141",
        /* 104 */ "0,129,31",
        /* 105 */ "86,129,96",
        /* 106 */ "0,104,25",
        /* 107 */ "69,104,78",
        /* 108 */ "0,79,19",
        /* 109 */ "53,79,59",
        /* 110 */ "0,255,127",
        /* 111 */ "170,255,212",
        /* 112 */ "0,189,94",
        /* 113 */ "126,189,157",
        /* 114 */ "0,129,64",
        /* 115 */ "86,129,107",
        /* 116 */ "0,104,52",
        /* 117 */ "69,104,86",
        /* 118 */ "0,79,39",
        /* 119 */ "53,79,66",
        /* 120 */ "0,255,191",
        /* 121 */ "170,255,234",
        /* 122 */ "0,189,141",
        /* 123 */ "126,189,173",
        /* 124 */ "0,129,96",
        /* 125 */ "86,129,118",
        /* 126 */ "0,104,78",
        /* 127 */ "69,104,95",
        /* 128 */ "0,79,59",
        /* 129 */ "53,79,73",
        /* 130 */ "0,255,255",
        /* 131 */ "170,255,255",
        /* 132 */ "0,189,189",
        /* 133 */ "126,189,189",
        /* 134 */ "0,129,129",
        /* 135 */ "86,129,129",
        /* 136 */ "0,104,104",
        /* 137 */ "69,104,104",
        /* 138 */ "0,79,79",
        /* 139 */ "53,79,79",
        /* 140 */ "0,191,255",
        /* 141 */ "170,234,255",
        /* 142 */ "0,141,189",
        /* 143 */ "126,173,189",
        /* 144 */ "0,96,129",
        /* 145 */ "86,118,129",
        /* 146 */ "0,78,104",
        /* 147 */ "69,95,104",
        /* 148 */ "0,59,79",
        /* 149 */ "53,73,79",
        /* 150 */ "0,127,255",
        /* 151 */ "170,212,255",
        /* 152 */ "0,94,189",
        /* 153 */ "126,157,189",
        /* 154 */ "0,64,129",
        /* 155 */ "86,107,129",
        /* 156 */ "0,52,104",
        /* 157 */ "69,86,104",
        /* 158 */ "0,39,79",
        /* 159 */ "53,66,79",
        /* 160 */ "0,63,255",
        /* 161 */ "170,191,255",
        /* 162 */ "0,46,189",
        /* 163 */ "126,141,189",
        /* 164 */ "0,31,129",
        /* 165 */ "86,96,129",
        /* 166 */ "0,25,104",
        /* 167 */ "69,78,104",
        /* 168 */ "0,19,79",
        /* 169 */ "53,59,79",
        /* 170 */ "0,0,255",
        /* 171 */ "170,170,255",
        /* 172 */ "0,0,189",
        /* 173 */ "126,126,189",
        /* 174 */ "0,0,129",
        /* 175 */ "86,86,129",
        /* 176 */ "0,0,104",
        /* 177 */ "69,69,104",
        /* 178 */ "0,0,79",
        /* 179 */ "53,53,79",
        /* 180 */ "63,0,255",
        /* 181 */ "191,170,255",
        /* 182 */ "46,0,189",
        /* 183 */ "141,126,189",
        /* 184 */ "31,0,129",
        /* 185 */ "96,86,129",
        /* 186 */ "25,0,104",
        /* 187 */ "78,69,104",
        /* 188 */ "19,0,79",
        /* 189 */ "59,53,79",
        /* 190 */ "127,0,255",
        /* 191 */ "212,170,255",
        /* 192 */ "94,0,189",
        /* 193 */ "157,126,189",
        /* 194 */ "64,0,129",
        /* 195 */ "107,86,129",
        /* 196 */ "52,0,104",
        /* 197 */ "86,69,104",
        /* 198 */ "39,0,79",
        /* 199 */ "66,53,79",
        /* 200 */ "191,0,255",
        /* 201 */ "234,170,255",
        /* 202 */ "141,0,189",
        /* 203 */ "173,126,189",
        /* 204 */ "96,0,129",
        /* 205 */ "118,86,129",
        /* 206 */ "78,0,104",
        /* 207 */ "95,69,104",
        /* 208 */ "59,0,79",
        /* 209 */ "73,53,79",
        /* 210 */ "255,0,255",
        /* 211 */ "255,170,255",
        /* 212 */ "189,0,189",
        /* 213 */ "189,126,189",
        /* 214 */ "129,0,129",
        /* 215 */ "129,86,129",
        /* 216 */ "104,0,104",
        /* 217 */ "104,69,104",
        /* 218 */ "79,0,79",
        /* 219 */ "79,53,79",
        /* 220 */ "255,0,191",
        /* 221 */ "255,170,234",
        /* 222 */ "189,0,141",
        /* 223 */ "189,126,173",
        /* 224 */ "129,0,96",
        /* 225 */ "129,86,118",
        /* 226 */ "104,0,78",
        /* 227 */ "104,69,95",
        /* 228 */ "79,0,59",
        /* 229 */ "79,53,73",
        /* 230 */ "255,0,127",
        /* 231 */ "255,170,212",
        /* 232 */ "189,0,94",
        /* 233 */ "189,126,157",
        /* 234 */ "129,0,64",
        /* 235 */ "129,86,107",
        /* 236 */ "104,0,52",
        /* 237 */ "104,69,86",
        /* 238 */ "79,0,39",
        /* 239 */ "79,53,66",
        /* 240 */ "255,0,63",
        /* 241 */ "255,170,191",
        /* 242 */ "189,0,46",
        /* 243 */ "189,126,141",
        /* 244 */ "129,0,31",
        /* 245 */ "129,86,96",
        /* 246 */ "104,0,25",
        /* 247 */ "104,69,78",
        /* 248 */ "79,0,19",
        /* 249 */ "79,53,59",
        /* 250 */ "51,51,51",
        /* 251 */ "80,80,80",
        /* 252 */ "105,105,105",
        /* 253 */ "130,130,130",
        /* 254 */ "190,190,190",
        /* 255 */ "255,255,255"
    };

    public static String getRGBString(int dxfColorCode) {
        if ((dxfColorCode < 0) || (dxfColorCode > rgbs.length)) {
            // default is white
            dxfColorCode = 7;
        }

        return rgbs[dxfColorCode];
    }

    public static void main(String[] args) {
        for (int i = 0; i <= 255; i++) {
            System.out.println(i + " " + rgbs[i].replace(',', ' ') + " 1 'Acad color rgb(" + rgbs[i] + ")'");
        }
    }
}
