/**
 * @docauthor Jason Johnston <jason@sencha.com>
 *
 * Provides a date input field with a {@link Ext.picker.Date date picker} dropdown and automatic date
 * validation.
 *
 * This field recognizes and uses the JavaScript Date object as its main {@link #value} type. In addition,
 * it recognizes string values which are parsed according to the {@link #format} and/or {@link #altFormats}
 * configs. These may be reconfigured to use date formats appropriate for the user's locale.
 *
 * The field may be limited to a certain range of dates by using the {@link #minValue}, {@link #maxValue},
 * {@link #disabledDays}, and {@link #disabledDates} config parameters. These configurations will be used both
 * in the field's validation, and in the date picker dropdown by preventing invalid dates from being selected.
 *
 * # Example usage
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         renderTo: Ext.getBody(),
 *         width: 300,
 *         bodyPadding: 10,
 *         title: 'Dates',
 *         items: [{
 *             xtype: 'datefield',
 *             anchor: '100%',
 *             fieldLabel: 'From',
 *             name: 'from_date',
 *             maxValue: new Date()  // limited to the current date or prior
 *         }, {
 *             xtype: 'datefield',
 *             anchor: '100%',
 *             fieldLabel: 'To',
 *             name: 'to_date',
 *             value: new Date()  // defaults to today
 *         }]
 *     });
 *
 * # Date Formats Examples
 *
 * This example shows a couple of different date format parsing scenarios. Both use custom date format
 * configurations; the first one matches the configured `format` while the second matches the `altFormats`.
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         renderTo: Ext.getBody(),
 *         width: 300,
 *         bodyPadding: 10,
 *         title: 'Dates',
 *         items: [{
 *             xtype: 'datefield',
 *             anchor: '100%',
 *             fieldLabel: 'Date',
 *             name: 'date',
 *             // The value matches the format; will be parsed and displayed using that format.
 *             format: 'm d Y',
 *             value: '2 4 1978'
 *         }, {
 *             xtype: 'datefield',
 *             anchor: '100%',
 *             fieldLabel: 'Date',
 *             name: 'date',
 *             // The value does not match the format, but does match an altFormat; will be parsed
 *             // using the altFormat and displayed using the format.
 *             format: 'm d Y',
 *             altFormats: 'm,d,Y|m.d.Y',
 *             value: '2.4.1978'
 *         }]
 *     });
 */
Ext.define('Axt.form.field.BetweenField', { extend:'Ext.form.field.Picker'

	,alias: 'widget.betweenfield'

	,requires: ['Axt.picker.Between']

	//,
    //alternateClassName: ['Ext.form.DateField', 'Ext.form.Date'],

    //<locale>
    /**
     * @cfg {String} format
     * The default date format string which can be overriden for localization support. The format must be valid
     * according to {@link Ext.Date#parse}.
     */
    ,format : "Y-m-d", //m/d/Y
    //</locale>
    //<locale>
    /**
     * @cfg {String} altFormats
     * Multiple date formats separated by "|" to try when parsing a user input value and it does not match the lookup_deflt_val
     * format.
     */
    altFormats : "m/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j",
    //</locale>
    //<locale>
    /**
     * @cfg {String} disabledDaysText
     * The tooltip to display when the date falls on a disabled day.
     */
    disabledDaysText : "Disabled",
    //</locale>
    //<locale>
    /**
     * @cfg {String} disabledDatesText
     * The tooltip text to display when the date falls on a disabled date.
     */
    disabledDatesText : "Disabled",
    //</locale>
    //<locale>
    /**
     * @cfg {String} minText
     * The error text to display when the date in the cell is before {@link #minValue}.
     */
    minText : "The date in this field must be equal to or after {0}",
    //</locale>
    //<locale>
    /**
     * @cfg {String} maxText
     * The error text to display when the date in the cell is after {@link #maxValue}.
     */
    maxText : "The date in this field must be equal to or before {0}",
    //</locale>
    //<locale>
    /**
     * @cfg {String} invalidText
     * The error text to display when the date in the field is invalid.
     */
    invalidText : "{0} is not a valid date - it must be in the format {1}",
    //</locale>
    /**
     * @cfg {String} [triggerCls='x-form-date-trigger']
     * An additional CSS class used to style the trigger button. The trigger will always get the class 'x-form-trigger'
     * and triggerCls will be **appended** if specified (default class displays a calendar icon).
     */
    triggerCls : Ext.baseCSSPrefix + 'form-date-trigger',
    /**
     * @cfg {Boolean} showToday
     * false to hide the footer area of the Date picker containing the Today button and disable the keyboard handler for
     * spacebar that selects the current date.
     */
    showToday : true,
    /**
     * @cfg {Date/String} minValue
     * The minimum allowed date. Can be either a Javascript date object or a string date in a valid format.
     */
    /**
     * @cfg {Date/String} maxValue
     * The maximum allowed date. Can be either a Javascript date object or a string date in a valid format.
     */
    /**
     * @cfg {Number[]} disabledDays
     * An array of days to disable, 0 based. Some examples:
     *
     *     // disable Sunday and Saturday:
     *     disabledDays:  [0, 6]
     *     // disable weekdays:
     *     disabledDays: [1,2,3,4,5]
     */
    /**
     * @cfg {String[]} disabledDates
     * An array of "dates" to disable, as strings. These strings will be used to build a dynamic regular expression so
     * they are very powerful. Some examples:
     *
     *     // disable these exact dates:
     *     disabledDates: ["03/08/2003", "09/16/2003"]
     *     // disable these days for every year:
     *     disabledDates: ["03/08", "09/16"]
     *     // only match the beginning (useful if you are using short years):
     *     disabledDates: ["^03/08"]
     *     // disable every day in March 2006:
     *     disabledDates: ["03/../2006"]
     *     // disable every day in every March:
     *     disabledDates: ["^03"]
     *
     * Note that the format of the dates included in the array should exactly match the {@link #format} config. In order
     * to support regular expressions, if you are using a {@link #format date format} that has "." in it, you will have
     * to escape the dot when restricting dates. For example: `["03\\.08\\.03"]`.
     */

    /**
     * @cfg {String} submitFormat
     * The date format string which will be submitted to the server. The format must be valid according to
     * {@link Ext.Date#parse}.
     *
     * Defaults to {@link #format}.
     */
    submitFormat : 'Ymd',
    value: new Date(),

    /**
     * @cfg {Boolean} useStrict
     * True to enforce strict date parsing to prevent the default Javascript "date rollover".
     * Defaults to the useStrict parameter set on Ext.Date
     * See {@link Ext.Date#parse}.
     */
    useStrict: undefined,

    // in the absence of a time value, a default value of 12 noon will be used
    // (note: 12 noon was chosen because it steers well clear of all DST timezone changes)
    initTime: '12', // 24 hour format

    initTimeFormat: 'H',

    matchFieldWidth: false,
    //<locale>
    /**
     * @cfg {Number} [startDay=undefined]
     * Day index at which the week should begin, 0-based.
     *
     * Defaults to `0` (Sunday).
     */
    startDay: 0,
    //</locale>

    rootField   : undefined,
    pairField   : undefined,
    lookupValue : undefined,
    clearable   : true,
//    defaultlookupValue :
//    [
//     	['today'     , '금일'  ],
//     	['yestday'   , '전일'  ],
//     	['week'      , '금주'  ],
//     	['lastweek'  , '전주'  ],
//     	['month'     , '금월'  ],
//     	['lastmonth' , '전월'  ],
//     	['oneweek'   , '금일기준 1주일' ],
//     	['twoweek'   , '금일기준 2주일' ],
//     	['onemonth'  , '금일기준 1개월' ],
//     	['twomonth'  , '금일기준 2개월' ]
//    ] ,

//    FR10 : 금일 : 오늘을 선택
//    FR15 : 전일 : 어제를 선택
//    FR20 : 금주 : 현재 일자 기준의 월요일 부터 일요일 까지
//    FR25 : 전주 : 전주의 월요일 부터 일요일 까지
//    FR30 : 금월 : 현재 일자 기준의 달
//    FR35 : 전월 : 지난달
//    FR60 : 금일기준 1주일 :
//    FR63 : 금일기준 2주일 :
//    FR66 : 금일기준 1개월 :
//    FR69 : 금일기준 2개월 :


    initComponent : function(){
        var me = this,
            isString = Ext.isString,
            min, max;

        min = me.minValue;
        max = me.maxValue;
        if(isString(min)){
            me.minValue = me.parseDate(min);
        }
        if(isString(max)){
            me.maxValue = me.parseDate(max);
        }
        if (me.clearable){
        	me.plugins = ['clearbutton'];
        }
        me.disabledDatesRE = null;
        me.initDisabledDays();


        me.callParent();
    },

    initValue: function() {
        var me = this,
            value = me.value;

        // If a String value was supplied, try to convert it to a proper Date
        if (Ext.isString(value)) {
            me.value = me.rawToValue(value);
        }

        me.callParent();
    },

    // private
    initDisabledDays : function(){
        if(this.disabledDates){
            var dd   = this.disabledDates,
                len  = dd.length - 1,
                re   = "(?:",
                d,
                dLen = dd.length,
                date;

            for (d = 0; d < dLen; d++) {
                date = dd[d];

                re += Ext.isDate(date) ? '^' + Ext.String.escapeRegex(date.dateFormat(this.format)) + '$' : date;
                if (d !== len) {
                    re += '|';
                }
            }

            this.disabledDatesRE = new RegExp(re + ')');
        }
    },

    /**
     * Replaces any existing disabled dates with new values and refreshes the Date picker.
     * @param {String[]} disabledDates An array of date strings (see the {@link #disabledDates} config for details on
     * supported values) used to disable a pattern of dates.
     */
    setDisabledDates : function(dd){
        var me = this,
            picker = me.picker;

        me.disabledDates = dd;
        me.initDisabledDays();
        if (picker) {
            picker.setDisabledDates(me.disabledDatesRE);
        }
    },

    /**
     * Replaces any existing disabled days (by index, 0-6) with new values and refreshes the Date picker.
     * @param {Number[]} disabledDays An array of disabled day indexes. See the {@link #disabledDays} config for details on
     * supported values.
     */
    setDisabledDays : function(dd){
        var picker = this.picker;

        this.disabledDays = dd;
        if (picker) {
            picker.setDisabledDays(dd);
        }
    },

    /**
     * Replaces any existing {@link #minValue} with the new value and refreshes the Date picker.
     * @param {Date} value The minimum date that can be selected
     */
    setMinValue : function(dt){
        var me = this,
            picker = me.picker,
            minValue = (Ext.isString(dt) ? me.parseDate(dt) : dt);

        me.minValue = minValue;
        if (picker) {
            picker.minText = Ext.String.format(me.minText, me.formatDate(me.minValue));
            picker.setMinDate(minValue);
        }
    },

    /**
     * Replaces any existing {@link #maxValue} with the new value and refreshes the Date picker.
     * @param {Date} value The maximum date that can be selected
     */
    setMaxValue : function(dt){
        var me = this,
            picker = me.picker,
            maxValue = (Ext.isString(dt) ? me.parseDate(dt) : dt);

        me.maxValue = maxValue;
        if (picker) {
            picker.maxText = Ext.String.format(me.maxText, me.formatDate(me.maxValue));
            picker.setMaxDate(maxValue);
        }
    },

    /**
     * Runs all of Date's validations and returns an array of any errors. Note that this first runs Text's validations,
     * so the returned array is an amalgamation of all field errors. The additional validation checks are testing that
     * the date format is valid, that the chosen date is within the min and max date constraints set, that the date
     * chosen is not in the disabledDates regex and that the day chosed is not one of the disabledDays.
     * @param {Object} [value] The value to get errors for (defaults to the current field value)
     * @return {String[]} All validation errors for this field
     */
    getErrors: function(value) {
        var me = this,
            format = Ext.String.format,
            clearTime = Ext.Date.clearTime,
            errors = me.callParent(arguments),
            disabledDays = me.disabledDays,
            disabledDatesRE = me.disabledDatesRE,
            minValue = me.minValue,
            maxValue = me.maxValue,
            len = disabledDays ? disabledDays.length : 0,
            i = 0,
            svalue,
            fvalue,
            day,
            time;

        value = me.formatDate(value || me.processRawValue(me.getRawValue()));

        if (value === null || value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
             return errors;
        }

        svalue = value;
        value = me.parseDate(value);
        if (!value) {
            errors.push(format(me.invalidText, svalue, Ext.Date.unescapeFormat(me.format)));
            return errors;
        }

        time = value.getTime();
        if (minValue && time < clearTime(minValue).getTime()) {
            errors.push(format(me.minText, me.formatDate(minValue)));
        }

        if (maxValue && time > clearTime(maxValue).getTime()) {
            errors.push(format(me.maxText, me.formatDate(maxValue)));
        }

        if (disabledDays) {
            day = value.getDay();

            for(; i < len; i++) {
                if (day === disabledDays[i]) {
                    errors.push(me.disabledDaysText);
                    break;
                }
            }
        }

        fvalue = me.formatDate(value);
        if (disabledDatesRE && disabledDatesRE.test(fvalue)) {
            errors.push(format(me.disabledDatesText, fvalue));
        }

        return errors;
    },

    rawToValue: function(rawValue) {
        return this.parseDate(rawValue) || rawValue || null;
    },

    valueToRaw: function(value) {
        return this.formatDate(this.parseDate(value));
    },

    /**
     * @method setValue
     * Sets the value of the date field. You can pass a date object or any string that can be parsed into a valid date,
     * using {@link #format} as the date format, according to the same rules as {@link Ext.Date#parse} (the default
     * format used is "m/d/Y").
     *
     * Usage:
     *
     *     //All of these calls set the same date value (May 4, 2006)
     *
     *     //Pass a date object:
     *     var dt = new Date('5/4/2006');
     *     dateField.setValue(dt);
     *
     *     //Pass a date string (default format):
     *     dateField.setValue('05/04/2006');
     *
     *     //Pass a date string (custom format):
     *     dateField.format = 'Y-m-d';
     *     dateField.setValue('2006-05-04');
     *
     * @param {String/Date} date The date or valid date string
     * @return {Ext.form.field.Date} this
     */

    /**
     * Attempts to parse a given string value using a given {@link Ext.Date#parse date format}.
     * @param {String} value The value to attempt to parse
     * @param {String} format A valid date format (see {@link Ext.Date#parse})
     * @return {Date} The parsed Date object, or null if the value could not be successfully parsed.
     */
    safeParse : function(value, format) {
        var me = this,
            utilDate = Ext.Date,
            result = null,
            strict = me.useStrict,
            parsedDate;

        if (utilDate.formatContainsHourInfo(format)) {
            // if parse format contains hour information, no DST adjustment is necessary
            result = utilDate.parse(value, format, strict);
        } else {
            // set time to 12 noon, then clear the time
            parsedDate = utilDate.parse(value + ' ' + me.initTime, format + ' ' + me.initTimeFormat, strict);
            if (parsedDate) {
                result = utilDate.clearTime(parsedDate);
            }
        }
        return result;
    },

    // @private
    getSubmitValue: function() {
        var format = this.submitFormat || this.format,
            value = this.getValue();

        return value ? Ext.Date.format(value, format) : '';
    },

    /**
     * @private
     */
    parseDate : function(value) {
        if(!value || Ext.isDate(value)){
            return value;
        }

        var me = this,
            val = me.safeParse(value, me.format),
            altFormats = me.altFormats,
            altFormatsArray = me.altFormatsArray,
            i = 0,
            len;

        if (!val && altFormats) {
            altFormatsArray = altFormatsArray || altFormats.split('|');
            len = altFormatsArray.length;
            for (; i < len && !val; ++i) {
                val = me.safeParse(value, altFormatsArray[i]);
            }
        }
        return val;
    },

    // private
    formatDate : function(date){
        return Ext.isDate(date) ? Ext.Date.dateFormat(date, this.format) : date;
    },

    createPicker: function() {
        var me = this,
            format = Ext.String.format
        ;
        if (!me.rootField) {
        	if (me.root){
        		me.rootField = me;
        		if (!me.lookupValue) {
        			me.lookupValue = resource.getList('frdt_gb');
        		}
        	} else {
            	me.rootField = me.up('form').down('[name=' + me.pair + ']');
        	}
        }
        if (!me.pairField) {
        	if (me.root){
            	me.pairField = me.up('form').down('[name=' + me.pair + ']');
        	} else {
            	me.pairField = me ;
        		if (!me.lookupValue) {
        			me.lookupValue = resource.getList('todt_gb');
        		}
        	}
        }

//        if (!me.rootField && me.pair[0]) {
//        	me.rootField = me.up('form').down('[name=' + me.pair[0] + ']');
//        }
//
//        if (!me.pairField && me.pair[1]) {
//        	//console.debug( 'pair ', me.pair );
//        	me.pairField = me.up('form').down('[name=' + me.pair[1] + ']');
//        	//console.debug( 'pairField' , pairField );
//        	//[name=mst_itm_id]'
//        }

        return new Axt.picker.Between({
            pickerField : me,
            rootField   : me.rootField,
            pairField   : me.pairField,
            lookupValue : me.lookupValue,
            ownerCt: me.ownerCt,
            renderTo: document.body,
            floating: true,
            hidden: true,
            focusOnShow: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            format: me.format,
            showToday: me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            listeners: {
                scope: me,
                select: me.onSelect
            },
            keyNavConfig: {
                esc: function() {
                    me.collapse();
                }
            }
        });
    },

    onDownArrow: function(e) {
        this.callParent(arguments);
        if (this.isExpanded) {
            this.getPicker().focus();
        }
    },

    onSelect: function(m, d) {
        var me = this;

        me.setValue(d);
        me.fireEvent('select', me, d);
        me.collapse();
    },

    /**
     * @private
     * Sets the Date picker's value to match the current field value when expanding.
     */
    onExpand: function() {
        var value = this.getValue();
        this.picker.setValue(Ext.isDate(value) ? value : new Date());
    },

    /**
     * @private
     * Focuses the field when collapsing the Date picker.
     */
    onCollapse: function() {
        this.focus(false, 60);
    },

    // private
    beforeBlur : function(){
        var me = this,
            v = me.parseDate(me.getRawValue()),
            focusTask = me.focusTask;

        if (focusTask) {
            focusTask.cancel();
        }

        if (v) {
            me.setValue(v);
        }
    }

    /**
     * @cfg {Boolean} grow
     * @private
     */
    /**
     * @cfg {Number} growMin
     * @private
     */
    /**
     * @cfg {Number} growMax
     * @private
     */
    /**
     * @method autoSize
     * @private
     */











});
