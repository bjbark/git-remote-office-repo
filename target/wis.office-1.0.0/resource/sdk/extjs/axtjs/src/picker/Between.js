/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial
Software License Agreement provided with the Software or, alternatively, in accordance with the
terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/

/**
 * A date picker. This class is used by the Ext.form.field.Date field to allow browsing and selection of valid
 * dates in a popup next to the field, but may also be used with other components.
 *
 * Typically you will need to implement a handler function to be notified when the user chooses a date from the picker;
 * you can register the handler using the {@link #select} event, or by implementing the {@link #handler} method.
 *
 * By default the user will be allowed to pick any date; this can be changed by using the {@link #minDate},
 * {@link #maxDate}, {@link #disabledDays}, {@link #disabledDatesRE}, and/or {@link #disabledDates} configs.
 *
 * All the string values documented below may be overridden by including an Ext locale file in your page.
 *
 *     @example
 *     Ext.create('Ext.panel.Panel', {
 *         title: 'Choose a future date:',
 *         width: 200,
 *         bodyPadding: 10,
 *         renderTo: Ext.getBody(),
 *         items: [{
 *             xtype: 'datepicker',
 *             minDate: new Date(),
 *             handler: function(picker, date) {
 *                 // do something with the selected date
 *             }
 *         }]
 *     });
 */
Ext.define('Axt.picker.Between', {
    extend: 'Ext.Component',
    requires: [
        'Ext.XTemplate',
        'Ext.button.Button',
        'Ext.button.Split',
        'Ext.util.ClickRepeater',
        'Ext.util.KeyNav',
        'Ext.EventObject',
        'Ext.fx.Manager',
        'Ext.picker.Month',
        'Axt.form.field.LookupField'
    ],
    alias: 'widget.datepicker',
    alternateClassName: 'Ext.DatePicker',

    childEls: [
        'innerEl', 'eventEl', 'prevEl', 'nextEl', 'middleBtnEl', 'footerEl'
    ],
    
    border: true,

    renderTpl: [
        '<div id="{id}-innerEl" role="grid">',
         	'<div>',
         		'<div role="presentation" class="{baseCls}-header">',
         			// the href attribute is required for the :hover selector to work in IE6/7/quirks
         			'<a id="{id}-prevEl" class="{baseCls}-prev {baseCls}-arrow" href="#" role="button" title="{prevText}" hidefocus="on" ></a>',
         			'<div class="{baseCls}-month" id="{id}-middleBtnEl">{%this.renderMonthBtn(values, out)%}</div>',
         			// the href attribute is required for the :hover selector to work in IE6/7/quirks
         			'<a id="{id}-nextEl" class="{baseCls}-next {baseCls}-arrow" href="#" role="button" title="{nextText}" hidefocus="on" ></a>',
         		'</div>',
         		'<table id="{id}-eventEl" class="{baseCls}-inner" cellspacing="0" role="grid">',
         			'<thead role="presentation"><tr role="row">',
         				'<tpl for="dayNames">',
         					'<th role="columnheader" class="{parent.baseCls}-column-header" title="{.}">',
         						'<div class="{parent.baseCls}-column-header-inner">{.:this.firstInitial}</div>',
         					'</th>',
         				'</tpl>',
         			'</tr></thead>',
         			'<tbody role="presentation"><tr role="row">',
         				'<tpl for="days">',
         					'{#:this.isEndOfWeek}',
         					'<td role="gridcell" id="{[Ext.id()]}">',
         						//the href attribute is required for the :hover selector to work in IE6/7/quirks
         						'<a role="presentation" hidefocus="on" class="{parent.baseCls}-date" href="#"></a>',
         					'</td>',
         				'</tpl>',
         			'</tr></tbody>',
                '</table>',
            '</div>',
            
            '<tpl if="showToday">',
                '<div id="{id}-footerEl" role="presentation" class="{baseCls}-footer">{%this.renderTodayBtn(values, out)%}</div>',
            '</tpl>',
        '</div>',
        {
            firstInitial: function(value) {
                return Ext.picker.Date.prototype.getDayInitial(value);
            },
            isEndOfWeek: function(value) {
            	
            	//console.debug( value );
            	
            	
                // convert from 1 based index to 0 based
                // by decrementing value once.
                value--;
                var end = value % 7 === 0 && value !== 0;
                return end ? '</tr><tr role="row">' : '';
            },
            renderTodayBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
            },
            renderMonthBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
            }
        }
    ],

    //<locale>
    /**
     * @cfg {String} todayText
     * The text to display on the button that selects the current date
     */
    todayText : 'Today',
    //</locale>
    
    //<locale>
    /**
     * @cfg {String} ariaTitle
     * The text to display for the aria title
     */
    ariaTitle: 'Date Picker: {0}',
    //</locale>
    
    //<locale>
    /**
     * @cfg {String} ariaTitleDateFormat
     * The date format to display for the current value in the {@link #ariaTitle}
     */
    ariaTitleDateFormat: 'F d, Y',
    //</locale>

    /**
     * @cfg {Function} handler
     * Optional. A function that will handle the select event of this picker. The handler is passed the following
     * parameters:
     *
     *   - `picker` : Ext.picker.Date
     *
     * This Date picker.
     *
     *   - `date` : Date
     *
     * The selected date.
     */

    /**
     * @cfg {Object} scope
     * The scope (`this` reference) in which the `{@link #handler}` function will be called.
     *
     * Defaults to this DatePicker instance.
     */

    //<locale>
    /**
     * @cfg {String} todayTip
     * A string used to format the message for displaying in a tooltip over the button that selects the current date.
     * The `{0}` token in string is replaced by today's date.
     */
    todayTip : '{0} (Spacebar)',
    //</locale>

    //<locale>
    /**
     * @cfg {String} minText
     * The error text to display if the minDate validation fails.
     */
    minText : 'This date is before the minimum date',
    //</locale>

    //<locale>
    /**
     * @cfg {String} maxText
     * The error text to display if the maxDate validation fails.
     */
    maxText : 'This date is after the maximum date',
    //</locale>

    /**
     * @cfg {String} format
     * The default date format string which can be overriden for localization support. The format must be valid
     * according to {@link Ext.Date#parse} (defaults to {@link Ext.Date#defaultFormat}).
     */

    //<locale>
    /**
     * @cfg {String} disabledDaysText
     * The tooltip to display when the date falls on a disabled day.
     */
    disabledDaysText : 'Disabled',
    //</locale>

    //<locale>
    /**
     * @cfg {String} disabledDatesText
     * The tooltip text to display when the date falls on a disabled date.
     */
    disabledDatesText : 'Disabled',
    //</locale>

    /**
     * @cfg {String[]} monthNames
     * An array of textual month names which can be overriden for localization support (defaults to Ext.Date.monthNames)
     * @deprecated This config is deprecated. In future the month names will be retrieved from {@link Ext.Date}
     */

    /**
     * @cfg {String[]} dayNames
     * An array of textual day names which can be overriden for localization support (defaults to Ext.Date.dayNames)
     * @deprecated This config is deprecated. In future the day names will be retrieved from {@link Ext.Date}
     */

    //<locale>
    /**
     * @cfg {String} nextText
     * The next month navigation button tooltip
     */
    nextText : 'Next Month (Control+Right)',
    //</locale>

    //<locale>
    /**
     * @cfg {String} prevText
     * The previous month navigation button tooltip
     */
    prevText : 'Previous Month (Control+Left)',
    //</locale>

    //<locale>
    /**
     * @cfg {String} monthYearText
     * The header month selector tooltip
     */
    monthYearText : 'Choose a month (Control+Up/Down to move years)',
    //</locale>
    
    //<locale>
    /**
     * @cfg {String} monthYearFormat
     * The date format for the header month
     */
    monthYearFormat: 'F Y',
    //</locale>

    //<locale>
    /**
     * @cfg {Number} [startDay=undefined]
     * Day index at which the week should begin, 0-based.
     *
     * Defaults to `0` (Sunday).
     */
    startDay : 0,
    //</locale>

    //<locale>
    /**
     * @cfg {Boolean} showToday
     * False to hide the footer area containing the Today button and disable the keyboard handler for spacebar that
     * selects the current date.
     */
    showToday : true,
    //</locale>

    /**
     * @cfg {Date} [minDate=null]
     * Minimum allowable date (JavaScript date object)
     */

    /**
     * @cfg {Date} [maxDate=null]
     * Maximum allowable date (JavaScript date object)
     */

    /**
     * @cfg {Number[]} [disabledDays=null]
     * An array of days to disable, 0-based. For example, [0, 6] disables Sunday and Saturday.
     */

    /**
     * @cfg {RegExp} [disabledDatesRE=null]
     * JavaScript regular expression used to disable a pattern of dates. The {@link #disabledDates}
     * config will generate this regex internally, but if you specify disabledDatesRE it will take precedence over the
     * disabledDates value.
     */

    /**
     * @cfg {String[]} disabledDates
     * An array of 'dates' to disable, as strings. These strings will be used to build a dynamic regular expression so
     * they are very powerful. Some examples:
     *
     *   - ['03/08/2003', '09/16/2003'] would disable those exact dates
     *   - ['03/08', '09/16'] would disable those days for every year
     *   - ['^03/08'] would only match the beginning (useful if you are using short years)
     *   - ['03/../2006'] would disable every day in March 2006
     *   - ['^03'] would disable every day in every March
     *
     * Note that the format of the dates included in the array should exactly match the {@link #format} config. In order
     * to support regular expressions, if you are using a date format that has '.' in it, you will have to escape the
     * dot when restricting dates. For example: ['03\\.08\\.03'].
     */

    /**
     * @cfg {Boolean} disableAnim
     * True to disable animations when showing the month picker.
     */
    disableAnim: false,

    /**
     * @cfg {String} [baseCls='x-datepicker']
     * The base CSS class to apply to this components element.
     */
    baseCls: Ext.baseCSSPrefix + 'datepicker',

    /**
     * @cfg {String} [selectedCls='x-datepicker-selected']
     * The class to apply to the selected cell.
     */

    /**
     * @cfg {String} [disabledCellCls='x-datepicker-disabled']
     * The class to apply to disabled cells.
     */

    //<locale>
    /**
     * @cfg {String} longDayFormat
     * The format for displaying a date in a longer format.
     */
    longDayFormat: 'F d, Y',
    //</locale>

    /**
     * @cfg {Object} keyNavConfig
     * Specifies optional custom key event handlers for the {@link Ext.util.KeyNav} attached to this date picker. Must
     * conform to the config format recognized by the {@link Ext.util.KeyNav} constructor. Handlers specified in this
     * object will replace default handlers of the same name.
     */

    /**
     * @cfg {Boolean} focusOnShow
     * True to automatically focus the picker on show.
     */
    focusOnShow: false,

    // @private
    // Set by other components to stop the picker focus being updated when the value changes.
    focusOnSelect: true,

    // Default value used to initialise each date in the DatePicker.
    // __Note:__ 12 noon was chosen because it steers well clear of all DST timezone changes.
    initHour: 12, // 24-hour format

    numDays: 42,

    // private, inherit docs
    initComponent : function() {
        var me = this,
            clearTime = Ext.Date.clearTime
        ;
        
      //  console.debug( me.up('form') );

        me.selectedCls = me.baseCls + '-selected';
        me.disabledCellCls = me.baseCls + '-disabled';
        me.prevCls = me.baseCls + '-prevday';
        me.activeCls = me.baseCls + '-active';
        me.cellCls = me.baseCls + '-cell';
        me.nextCls = me.baseCls + '-prevday';
        me.todayCls = me.baseCls + '-today';
        
        
        if (!me.format) {
            me.format = Ext.Date.defaultFormat;
        }
        if (!me.dayNames) {
            me.dayNames = Ext.Date.dayNames;
        }
        me.dayNames = me.dayNames.slice(me.startDay).concat(me.dayNames.slice(0, me.startDay));

        me.callParent();

        me.value = me.value ? clearTime(me.value, true) : clearTime(new Date());

        me.addEvents(
            /**
             * @event select
             * Fires when a date is selected
             * @param {Ext.picker.Date} this DatePicker
             * @param {Date} date The selected date
             */
            'select'
        );

        me.initDisabledDays();
    },

    beforeRender: function () {
        /*
         * days array for looping through 6 full weeks (6 weeks * 7 days)
         * Note that we explicitly force the size here so the template creates
         * all the appropriate cells.
         */
        var me = this,
            days = new Array(me.numDays),
            today = Ext.Date.format(new Date(), me.format);

        // If there's a Menu among our ancestors, then add the menu class.
        // This is so that the MenuManager does not see a mousedown in this Component as a document mousedown, outside the Menu
        if (me.up('menu')) {
            me.addCls(Ext.baseCSSPrefix + 'menu');
        }

        me.monthBtn = new Ext.button.Split({
            ownerCt: me,
            ownerLayout: me.getComponentLayout(),
            text: '',
            tooltip: me.monthYearText,
            listeners: {
                click: me.showMonthPicker,
                arrowclick: me.showMonthPicker,
                scope: me
            }
        });

        if (me.showToday) {
            me.todayBtn = new Ext.Toolbar({
            	border : 0 ,
                //ownerCt: me,
                //ownerLayout: me.getComponentLayout(),
                //text: Ext.String.format(me.todayText, today),
                //tooltip: Ext.String.format(me.todayTip, today),
                //tooltipType: 'title',
                //handler: me.selectToday,
            	layout : 'vbox',
                scope  : me,
                margin : '0 0 0 0',
                padding : '0 0 0 0',
                items : 
                [
//                    { 
//                 		xtype        : 'lookupfield' ,
//                 		lookupValue  : me.lookupValue ,
//                 		width        : 171,
//                 		editable     : false,
//                 		emptyText   : '단축 날짜 선택' , 
//                 		scope        : me  ,
//                 		listConfig: {
//                 	        listeners: {
//                 	            itemclick: function(list, record) {
//
//                 	            	var  today = Ext.Date.clearTime( new Date() ) //new Date('8/11/2013')    //
//            	 						,index = record.get('code')
//            	 						,sdate  
//            	 						,edate  
//            	 					;
////                 	             FR10 : 금일 : 오늘을 선택
////                 	             FR15 : 전일 : 어제를 선택
////                 	             FR20 : 금주 : 현재 일자 기준의 월요일 부터 일요일 까지
////                 	             FR25 : 전주 : 전주의 월요일 부터 일요일 까지
////                 	             FR30 : 금월 : 현재 일자 기준의 달  
////                 	             FR35 : 전월 : 지난달 
////                 	             FR60 : 금일기준 1주일 :
////                 	             FR63 : 금일기준 2주일 : 
////                 	             FR66 : 금일기준 1개월 : 
////                 	             FR69 : 금일기준 2개월 :                      	            	
//                 	            	
//            	 					if (index === 'FR10' ) { /* 금일 */
//            	 						sdate = today; 
//            	 						edate = today;
//            	 					} else 
//            	 					if (index === 'FR15') { /* 전일 */
//            	 						sdate = Ext.Date.add( today , Ext.Date.DAY, -1);  
//            	 						edate = Ext.Date.add( today , Ext.Date.DAY, -1);  
//            	 					} else 
//                	 				if (index === 'FR20'    ) { /* 금주 */
//                	 					var week = today.getDay();
//                	 					if (week === 0) {
//                	 						sdate = Ext.Date.add( today , Ext.Date.DAY, -6 );  
//                	 						edate = today ;  
//                	 					} else {
//                	 						sdate = Ext.Date.add( today , Ext.Date.DAY, -(week-1) );  
//                	 						edate = Ext.Date.add( sdate , Ext.Date.DAY, +6 );  
//                	 					}
//                	 				} else 
//                    	 			if (index === 'FR25' ) { /* 전주  */
//                	 					var week = today.getDay();
//                	 					if (week === 0) {
//                	 						sdate = Ext.Date.add( today , Ext.Date.DAY, -6 );  
//                	 						edate = today ;  
//                	 					} else {
//                	 						sdate = Ext.Date.add( today , Ext.Date.DAY, -(week-1) );  
//                	 						edate = Ext.Date.add( sdate , Ext.Date.DAY, +6 );  
//                	 					}
//            	 						sdate = Ext.Date.add( sdate , Ext.Date.DAY, -7);  
//            	 						edate = Ext.Date.add( edate , Ext.Date.DAY, -7);  
//                    	 			} else 
//                        	 		if (index === 'FR30'    ) { /* 금월 */
//            	 						sdate = Ext.Date.getFirstDateOfMonth(today);   
//            	 						edate = Ext.Date.getLastDateOfMonth (today);   
//                        	 		} else 
//                            	 	if (index === 'FR35') { /* 전월 */
//                            	 		today = Ext.Date.add( Ext.Date.getFirstDateOfMonth(today) , Ext.Date.DAY, -1); //   Ext.Date.getFirstDateOfMonth(today).add( -1 ); 
//                            	 		sdate = Ext.Date.getFirstDateOfMonth(today);   
//            	 						edate = Ext.Date.getLastDateOfMonth (today);   
//                            	 	} else 
//                                	if (index === 'FR60'  ) { /* 금일기준 1주일 */
//            	 						sdate = Ext.Date.add( today , Ext.Date.DAY, -7);  
//            	 						edate = today ;  
//                                	} else 
//                                    if (index === 'FR63'  ) { /* 금일기준 2주일 */
//            	 						sdate = Ext.Date.add( today , Ext.Date.DAY, -14);  
//            	 						edate = today ;  
//                                    } else 
//                                    if (index === 'FR66'  ) { /* 금일기준 1개월  */
//            	 						sdate = Ext.Date.add( today , Ext.Date.MONTH, -1);  
//            	 						edate = today ;  
//                                    } else 
//                                    if (index === 'FR69'  ) { /* 금일기준 2개월 */
//            	 						sdate = Ext.Date.add( today , Ext.Date.MONTH, -2);  
//            	 						edate = today ;  
//            	 					}
//            	 					if (sdate && edate){
//            	 						me.rootField.setValue(Ext.Date.clearTime( sdate ));
//            	 						me.pairField.setValue(Ext.Date.clearTime( edate ));
//            	 					}
//                 	            }
//                 	        }
//                 	    }
//                    }
                    //,'->'
                 	me.createLine1(),
                 	me.createLine2()
                ]
            });  
//            me.todayBtn = new Ext.button.Button({
//                ownerCt: me,
//                ownerLayout: me.getComponentLayout(),
//                text: Ext.String.format(me.todayText, today),
//                tooltip: Ext.String.format(me.todayTip, today),
//                tooltipType: 'title',
//                handler: me.selectToday,
//                scope: me
//            });
        }

        me.callParent();

        Ext.applyIf(me, {
            renderData: {}
        });

        Ext.apply(me.renderData, {
            dayNames: me.dayNames,
            showToday: me.showToday,
            prevText: me.prevText,
            nextText: me.nextText,
            days: days
        });

        me.protoEl.unselectable();
    }
    
    ,selectLookup : function ( ) {
    	var  me = this
    		,toolbar = me.todayBtn
    	 	,lookup  = toolbar.down('lookupfield')
    	;
    	
    	//console.debug( 'ssss' , [x1, x2, x3 ] );
    	//console.debug('code', lookup.getValue() ); 
    	
    	
    	me.onSelect();
    	
    	//if(btn && !btn.disabled){
   		//me.setValue(Ext.Date.clearTime(new Date()));
   		//me.fireEvent('select', me, me.value);
//   		if (handler) {
//   			handler.call(me.scope || me, me, me.value);
//   		}
   		//me.onSelect();
    	//}
    	return me;    	
    	//console.debug( 'lookup ');
    }
    
    // Do the job of a container layout at this point even though we are not a Container.
    // TODO: Refactor as a Container.
    ,finishRenderChildren: function () {
        var me = this;
        
        me.callParent();
        me.monthBtn.finishRender();
        if (me.showToday) {
            me.todayBtn.finishRender();
        }
    },

    // @private
    // @inheritdoc
    onRender : function(container, position){
        var me = this;
        me.callParent(arguments);
        me.cells = me.eventEl.select('tbody td');
        me.textNodes = me.eventEl.query('tbody td a');
        me.mon(me.eventEl, {
            scope: me,
            mousewheel: me.handleMouseWheel,
            click: {
                fn: me.handleDateClick,
                delegate: 'a.' + me.baseCls + '-date'
            }
        });
        
    },

    // @private
    // @inheritdoc
    initEvents: function(){
        var me = this,
            eDate = Ext.Date,
            day = eDate.DAY;

        me.callParent();

        me.prevRepeater = new Ext.util.ClickRepeater(me.prevEl, {
            handler: me.showPrevMonth,
            scope: me,
            preventDefault: true,
            stopDefault: true
        });

        me.nextRepeater = new Ext.util.ClickRepeater(me.nextEl, {
            handler: me.showNextMonth,
            scope: me,
            preventDefault:true,
            stopDefault:true
        });

        me.keyNav = new Ext.util.KeyNav(me.eventEl, Ext.apply({
            scope: me,
            left : function(e){
                if(e.ctrlKey){
                    me.showPrevMonth();
                }else{
                    me.update(eDate.add(me.activeDate, day, -1));
                }
            },

            right : function(e){
                if(e.ctrlKey){
                    me.showNextMonth();
                }else{
                    me.update(eDate.add(me.activeDate, day, 1));
                }
            },

            up : function(e){
                if(e.ctrlKey){
                    me.showNextYear();
                }else{
                    me.update(eDate.add(me.activeDate, day, -7));
                }
            },

            down : function(e){
                if(e.ctrlKey){
                    me.showPrevYear();
                }else{
                    me.update(eDate.add(me.activeDate, day, 7));
                }
            },

            pageUp:function (e) {
                if (e.altKey) {
                    me.showPrevYear();
                } else {
                    me.showPrevMonth();
                }
            },

            pageDown:function (e) {
                if (e.altKey) {
                    me.showNextYear();
                } else {
                    me.showNextMonth();
                }
            },

            tab:function (e) {
                me.doCancelFieldFocus = true;
                me.handleTabClick(e);
                delete me.doCancelFieldFocus;
                return true;
            },
            
            enter : function(e){
                e.stopPropagation();
                return true;
            },

            //space: ???

            home:function (e) {
                me.update(eDate.getFirstDateOfMonth(me.activeDate));
            },

            end:function (e) {
                me.update(eDate.getLastDateOfMonth(me.activeDate));
            }
        }, me.keyNavConfig));

        if (me.showToday) {
            me.todayKeyListener = me.eventEl.addKeyListener(Ext.EventObject.SPACE, me.selectToday,  me);
        }
        me.update(me.value);
    },

    handleTabClick:function (e) {
        var me = this,
            t = me.getSelectedDate(me.activeDate),
            handler = me.handler;

        // The following code is like handleDateClick without the e.stopEvent()
        if (!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)) {
            me.doCancelFocus = me.focusOnSelect === false;
            me.setValue(new Date(t.dateValue));
            delete me.doCancelFocus;
            me.fireEvent('select', me, me.value);
            if (handler) {
                handler.call(me.scope || me, me, me.value);
            }
            me.onSelect();
        }
    },

    getSelectedDate:function (date) {
        var me = this,
            t = date.getTime(),
            cells = me.cells,
            cls = me.selectedCls,
            cellItems = cells.elements,
            c,
            cLen = cellItems.length,
            cell;

        cells.removeCls(cls);

        for (c = 0; c < cLen; c++) {
            cell = Ext.fly(cellItems[c]);

            if (cell.dom.firstChild.dateValue == t) {
                return cell.dom.firstChild;
            }
        }
        return null;
    },

    /**
     * Setup the disabled dates regex based on config options
     * @private
     */
    initDisabledDays : function(){
        var me = this,
            dd = me.disabledDates,
            re = '(?:',
            len,
            d, dLen, dI;

        if(!me.disabledDatesRE && dd){
                len = dd.length - 1;

            dLen = dd.length;

            for (d = 0; d < dLen; d++) {
                dI = dd[d];

                re += Ext.isDate(dI) ? '^' + Ext.String.escapeRegex(Ext.Date.dateFormat(dI, me.format)) + '$' : dI;
                if (d != len) {
                    re += '|';
                }
            }

            me.disabledDatesRE = new RegExp(re + ')');
        }
    },

    /**
     * Replaces any existing disabled dates with new values and refreshes the DatePicker.
     * @param {String[]/RegExp} disabledDates An array of date strings (see the {@link #disabledDates} config for
     * details on supported values), or a JavaScript regular expression used to disable a pattern of dates.
     * @return {Ext.picker.Date} this
     */
    setDisabledDates : function(dd){
        var me = this;

        if(Ext.isArray(dd)){
            me.disabledDates = dd;
            me.disabledDatesRE = null;
        }else{
            me.disabledDatesRE = dd;
        }
        me.initDisabledDays();
        me.update(me.value, true);
        return me;
    },

    /**
     * Replaces any existing disabled days (by index, 0-6) with new values and refreshes the DatePicker.
     * @param {Number[]} disabledDays An array of disabled day indexes. See the {@link #disabledDays} config for details
     * on supported values.
     * @return {Ext.picker.Date} this
     */
    setDisabledDays : function(dd){
        this.disabledDays = dd;
        return this.update(this.value, true);
    },

    /**
     * Replaces any existing {@link #minDate} with the new value and refreshes the DatePicker.
     * @param {Date} value The minimum date that can be selected
     * @return {Ext.picker.Date} this
     */
    setMinDate : function(dt){
        this.minDate = dt;
        return this.update(this.value, true);
    },

    /**
     * Replaces any existing {@link #maxDate} with the new value and refreshes the DatePicker.
     * @param {Date} value The maximum date that can be selected
     * @return {Ext.picker.Date} this
     */
    setMaxDate : function(dt){
        this.maxDate = dt;
        return this.update(this.value, true);
    },

    /**
     * Sets the value of the date field
     * @param {Date} value The date to set
     * @return {Ext.picker.Date} this
     */
    setValue : function(value){
        this.value = Ext.Date.clearTime(value, true);
        return this.update(this.value);
    },

    /**
     * Gets the current selected value of the date field
     * @return {Date} The selected date
     */
    getValue : function(){
        return this.value;
    },

    //<locale type="function">
    /**
     * Gets a single character to represent the day of the week
     * @return {String} The character
     */
    getDayInitial: function(value){
        return value.substr(0,1);
    },
    //</locale>

    // @private
    focus : function(){
        this.update(this.activeDate);
    },

    // @private
    // @inheritdoc
    onEnable: function(){
        this.callParent();
        this.setDisabledStatus(false);
        this.update(this.activeDate);

    },

    // @private
    // @inheritdoc
    onDisable : function(){
        this.callParent();
        this.setDisabledStatus(true);
    },

    /**
     * Set the disabled state of various internal components
     * @private
     * @param {Boolean} disabled
     */
    setDisabledStatus : function(disabled){
        var me = this;

        me.keyNav.setDisabled(disabled);
        me.prevRepeater.setDisabled(disabled);
        me.nextRepeater.setDisabled(disabled);
        if (me.showToday) {
            me.todayKeyListener.setDisabled(disabled);
            me.todayBtn.setDisabled(disabled);
        }
    },

    /**
     * Get the current active date.
     * @private
     * @return {Date} The active date
     */
    getActive: function(){
        return this.activeDate || this.value;
    },

    /**
     * Run any animation required to hide/show the month picker.
     * @private
     * @param {Boolean} isHide True if it's a hide operation
     */
    runAnimation: function(isHide){
        var picker = this.monthPicker,
            options = {
                duration: 200,
                callback: function(){
                    if (isHide) {
                        picker.hide();
                    } else {
                        picker.show();
                    }
                }
            };

        if (isHide) {
            picker.el.slideOut('t', options);
        } else {
            picker.el.slideIn('t', options);
        }
    },

    /**
     * Hides the month picker, if it's visible.
     * @param {Boolean} [animate] Indicates whether to animate this action. If the animate
     * parameter is not specified, the behavior will use {@link #disableAnim} to determine
     * whether to animate or not.
     * @return {Ext.picker.Date} this
     */
    hideMonthPicker : function(animate){
        var me = this,
            picker = me.monthPicker;

        if (picker) {
            if (me.shouldAnimate(animate)) {
                me.runAnimation(true);
            } else {
                picker.hide();
            }
        }
        return me;
    },

    /**
     * Show the month picker
     * @param {Boolean} [animate] Indicates whether to animate this action. If the animate
     * parameter is not specified, the behavior will use {@link #disableAnim} to determine
     * whether to animate or not.
     * @return {Ext.picker.Date} this
     */
    showMonthPicker : function(animate){
        var me = this,
            picker;
        
        if (me.rendered && !me.disabled) {
            picker = me.createMonthPicker();
            picker.setValue(me.getActive());
            picker.setSize(me.getSize());
            picker.setPosition(-1, -1);
            if (me.shouldAnimate(animate)) {
                me.runAnimation(false);
            } else {
                picker.show();
            }
        }
        return me;
    },
    
    /**
     * Checks whether a hide/show action should animate
     * @private
     * @param {Boolean} [animate] A possible animation value
     * @return {Boolean} Whether to animate the action
     */
    shouldAnimate: function(animate){
        return Ext.isDefined(animate) ? animate : !this.disableAnim;
    },

    /**
     * Create the month picker instance
     * @private
     * @return {Ext.picker.Month} picker
     */
    createMonthPicker: function(){
        var me = this,
            picker = me.monthPicker;

        if (!picker) {
            me.monthPicker = picker = new Ext.picker.Month({
                renderTo: me.el,
                floating: true,
                shadow: false,
                small: me.showToday === false,
                listeners: {
                    scope: me,
                    cancelclick: me.onCancelClick,
                    okclick: me.onOkClick,
                    yeardblclick: me.onOkClick,
                    monthdblclick: me.onOkClick
                }
            });
            if (!me.disableAnim) {
                // hide the element if we're animating to prevent an initial flicker
                picker.el.setStyle('display', 'none');
            }
            me.on('beforehide', Ext.Function.bind(me.hideMonthPicker, me, [false]));
        }
        return picker;
    },

    /**
     * Respond to an ok click on the month picker
     * @private
     */
    onOkClick: function(picker, value){
        var me = this,
            month = value[0],
            year = value[1],
            date = new Date(year, month, me.getActive().getDate());

        if (date.getMonth() !== month) {
            // 'fix' the JS rolling date conversion if needed
            date = Ext.Date.getLastDateOfMonth(new Date(year, month, 1));
        }
        me.setValue(date);
        me.hideMonthPicker();
    },

    /**
     * Respond to a cancel click on the month picker
     * @private
     */
    onCancelClick: function(){
        // update the selected value, also triggers a focus
        this.selectedUpdate(this.activeDate);
        this.hideMonthPicker();
    },

    /**
     * Show the previous month.
     * @param {Object} e
     * @return {Ext.picker.Date} this
     */
    showPrevMonth : function(e){
        return this.setValue(Ext.Date.add(this.activeDate, Ext.Date.MONTH, -1));
    },

    /**
     * Show the next month.
     * @param {Object} e
     * @return {Ext.picker.Date} this
     */
    showNextMonth : function(e){
        return this.setValue(Ext.Date.add(this.activeDate, Ext.Date.MONTH, 1));
    },

    /**
     * Show the previous year.
     * @return {Ext.picker.Date} this
     */
    showPrevYear : function(){
        return this.setValue(Ext.Date.add(this.activeDate, Ext.Date.YEAR, -1));
    },

    /**
     * Show the next year.
     * @return {Ext.picker.Date} this
     */
    showNextYear : function(){
        return this.setValue(Ext.Date.add(this.activeDate, Ext.Date.YEAR, 1));
    },

    /**
     * Respond to the mouse wheel event
     * @private
     * @param {Ext.EventObject} e
     */
    handleMouseWheel : function(e){
        e.stopEvent();
        if(!this.disabled){
            var delta = e.getWheelDelta();
            if(delta > 0){
                this.showPrevMonth();
            } else if(delta < 0){
                this.showNextMonth();
            }
        }
    },

    /**
     * Respond to a date being clicked in the picker
     * @private
     * @param {Ext.EventObject} e
     * @param {HTMLElement} t
     */
    handleDateClick : function(e, t){
        var me = this,
            handler = me.handler;

        e.stopEvent();
        if(!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)){
            me.doCancelFocus = me.focusOnSelect === false;
            me.setValue(new Date(t.dateValue));
            delete me.doCancelFocus;
            me.fireEvent('select', me, me.value);
            if (handler) {
                handler.call(me.scope || me, me, me.value);
            }
            // event handling is turned off on hide
            // when we are using the picker in a field
            // therefore onSelect comes AFTER the select
            // event.
            me.onSelect();
        }
    },

    /**
     * Perform any post-select actions
     * @private
     */
    onSelect: function() {
        if (this.hideOnSelect) {
             this.hide();
         }
    },

    /**
     * Sets the current value to today.
     * @return {Ext.picker.Date} this
     */
    selectToday : function(){
        var  me = this
        	,btn = me.todayBtn
        	,handler = me.handler
        ;
        if(btn && !btn.disabled){
            me.setValue(Ext.Date.clearTime(new Date()));
            me.fireEvent('select', me, me.value);
            if (handler) {
                handler.call(me.scope || me, me, me.value);
            }
            me.onSelect();
        }
        return me;
    },

    /**
     * Update the selected cell
     * @private
     * @param {Date} date The new date
     */
    selectedUpdate: function(date){
        var me        = this,
            t         = date.getTime(),
            cells     = me.cells,
            cls       = me.selectedCls,
            cellItems = cells.elements,
            c,
            cLen      = cellItems.length,
            cell;

        cells.removeCls(cls);

        for (c = 0; c < cLen; c++) {
            cell = Ext.fly(cellItems[c]);

            if (cell.dom.firstChild.dateValue == t) {
                me.fireEvent('highlightitem', me, cell);
                cell.addCls(cls);

                if(me.isVisible() && !me.doCancelFocus){
                    Ext.fly(cell.dom.firstChild).focus(50);
                }

                break;
            }
        }
    },

    /**
     * Update the cont_cont of the picker for a new month
     * @private
     * @param {Date} date The new date
     */
    fullUpdate: function(date){
        var me = this,
            cells = me.cells.elements,
            textNodes = me.textNodes,
            disabledCls = me.disabledCellCls,
            eDate = Ext.Date,
            i = 0,
            extraDays = 0,
            visible = me.isVisible(),
            newDate = +eDate.clearTime(date, true),
            today = +eDate.clearTime(new Date()),
            min = me.minDate ? eDate.clearTime(me.minDate, true) : Number.NEGATIVE_INFINITY,
            max = me.maxDate ? eDate.clearTime(me.maxDate, true) : Number.POSITIVE_INFINITY,
            ddMatch = me.disabledDatesRE,
            ddText = me.disabledDatesText,
            ddays = me.disabledDays ? me.disabledDays.join('') : false,
            ddaysText = me.disabledDaysText,
            format = me.format,
            days = eDate.getDaysInMonth(date),
            firstOfMonth = eDate.getFirstDateOfMonth(date),
            startingPos = firstOfMonth.getDay() - me.startDay,
            previousMonth = eDate.add(date, eDate.MONTH, -1),
            longDayFormat = me.longDayFormat,
            prevStart,
            current,
            disableToday,
            tempDate,
            setCellClass,
            html,
            cls,
            formatValue,
            value;

        if (startingPos < 0) {
            startingPos += 7;
        }

        days += startingPos;
        prevStart = eDate.getDaysInMonth(previousMonth) - startingPos;
        current = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), prevStart, me.initHour);

        if (me.showToday) {
            tempDate = eDate.clearTime(new Date());
            disableToday = (tempDate < min || tempDate > max ||
                (ddMatch && format && ddMatch.test(eDate.dateFormat(tempDate, format))) ||
                (ddays && ddays.indexOf(tempDate.getDay()) != -1));

            if (!me.disabled) {
                me.todayBtn.setDisabled(disableToday);
                me.todayKeyListener.setDisabled(disableToday);
            }
        }

        setCellClass = function(cell, cls){
            value = +eDate.clearTime(current, true);
            cell.title = eDate.format(current, longDayFormat);
            // store dateValue number as an expando
            cell.firstChild.dateValue = value;
            if(value == today){
                cls += ' ' + me.todayCls;
                cell.title = me.todayText;
                
                // Extra element for ARIA purposes
                me.todayElSpan = Ext.DomHelper.append(cell.firstChild, {
                    tag:'span',
                    cls: Ext.baseCSSPrefix + 'hide-clip',
                    html:me.todayText
                }, true);
            }
            if(value == newDate) {
                cls += ' ' + me.selectedCls;
                me.fireEvent('highlightitem', me, cell);
                if (visible && me.floating) {
                    Ext.fly(cell.firstChild).focus(50);
                }
            }

            if (value < min) {
                cls += ' ' + disabledCls;
                cell.title = me.minText;
            }
            else if (value > max) {
                cls += ' ' + disabledCls;
                cell.title = me.maxText;
            }
            else if (ddays && ddays.indexOf(current.getDay()) !== -1){
                cell.title = ddaysText;
                cls += ' ' + disabledCls;
            }
            else if (ddMatch && format){
                formatValue = eDate.dateFormat(current, format);
                if(ddMatch.test(formatValue)){
                    cell.title = ddText.replace('%0', formatValue);
                    cls += ' ' + disabledCls;
                }
            }
            cell.className = cls + ' ' + me.cellCls;
        };

        for(; i < me.numDays; ++i) {
            if (i < startingPos) {
                html = (++prevStart);
                cls = me.prevCls;
            } else if (i >= days) {
                html = (++extraDays);
                cls = me.nextCls;
            } else {
                html = i - startingPos + 1;
                cls = me.activeCls;
            }
            textNodes[i].innerHTML = html;
            current.setDate(current.getDate() + 1);
            setCellClass(cells[i], cls);
        }

        me.monthBtn.setText(Ext.Date.format(date, me.monthYearFormat));
    },

    /**
     * Update the cont_cont of the picker
     * @private
     * @param {Date} date The new date
     * @param {Boolean} forceRefresh True to force a full refresh
     */
    update : function(date, forceRefresh){
        var me = this,
            active = me.activeDate;

        if (me.rendered) {
            me.activeDate = date;
            if(!forceRefresh && active && me.el && active.getMonth() == date.getMonth() && active.getFullYear() == date.getFullYear()){
                me.selectedUpdate(date, active);
            } else {
                me.fullUpdate(date, active);
            }
        }
        return me;
    },

    // @private
    // @inheritdoc
    beforeDestroy : function() {
        var me = this;

        if (me.rendered) {
            Ext.destroy(
                me.todayKeyListener,
                me.keyNav,
                me.monthPicker,
                me.monthBtn,
                me.nextRepeater,
                me.prevRepeater,
                me.todayBtn
            );
            delete me.textNodes;
            delete me.cells.elements;
        }
        me.callParent();
    },

    // @private
    // @inheritdoc
    onShow: function() {
        this.callParent(arguments);
        if (this.focusOnShow) {
            this.focus();
        }
    },
    
	createLine1 : function(){
		var me = this,
			line = {
				xtype : 'fieldset' ,
				layout: 'hbox',
				border : 0,
				margin : '0 0 0 0',
				padding : '0 0 0 7',
				items : [
					{ xtype : 'button', text : '금일' , data:{code:'FR10'} , width : 50, handler : me.clickButton, scope: me  },
					{ xtype : 'button', text : '금주' , data:{code:'FR20'} , width : 50, handler : me.clickButton, scope: me  },
 					{ xtype : 'button', text : '금월' , data:{code:'FR30'} , width : 50, handler : me.clickButton, scope: me  }
				]
			}
		;
		return line;
	},
	
	createLine2 : function(){
		var me = this,
			line = {
				xtype : 'fieldset' ,
				layout: 'hbox',
				border : 0,
				margin : '7 0 0 0',
				padding : '0 0 0 7',
				items : [
					{ xtype : 'button', text : '전일' , data:{code:'FR15'} , width : 50, handler : me.clickButton, scope: me  },
					{ xtype : 'button', text : '전주' , data:{code:'FR25'} , width : 50, handler : me.clickButton, scope: me  },
					{ xtype : 'button', text : '전월' , data:{code:'FR35'} , width : 50, handler : me.clickButton, scope: me  }
				]
			}
    	;
    	return line;
    },
    
	clickButton : function(obj) {
		var  today = Ext.Date.clearTime( new Date() ) //new Date('8/11/2013')    //
			,sdate  
			,edate
			,me = this
			,key = obj.data.code
		;
		
		//  FR10 : 금일 : 오늘을 선택
		//  FR15 : 전일 : 어제를 선택
		//  FR20 : 금주 : 현재 일자 기준의 월요일 부터 일요일 까지
		//  FR25 : 전주 : 전주의 월요일 부터 일요일 까지
		//  FR30 : 금월 : 현재 일자 기준의 달  
		//  FR35 : 전월 : 지난달 
 	
		if (key === 'FR10') { /* 금일 */
			sdate = today; 
			edate = today;
		} else 
		if (key === 'FR15') { /* 전일 */
			sdate = Ext.Date.add( today , Ext.Date.DAY, -1);  
			edate = Ext.Date.add( today , Ext.Date.DAY, -1);  
		} else 
		if (key === 'FR20') { /* 금주 */
			var week = today.getDay();
			if (week === 0) {
				sdate = Ext.Date.add( today , Ext.Date.DAY, -6 );  
				edate = today;  
			} else {
				sdate = Ext.Date.add( today , Ext.Date.DAY, -(week-1) );  
				edate = Ext.Date.add( sdate , Ext.Date.DAY, +6 );  
			}
		} else 
		if (key === 'FR25' ) { /* 전주  */
			var week = today.getDay();
			if (week === 0) {
				sdate = Ext.Date.add( today , Ext.Date.DAY, -6 );  
				edate = today ;  
			} else {
				sdate = Ext.Date.add( today , Ext.Date.DAY, -(week-1) );  
				edate = Ext.Date.add( sdate , Ext.Date.DAY, +6 );  
			}
			sdate = Ext.Date.add( sdate , Ext.Date.DAY, -7);  
			edate = Ext.Date.add( edate , Ext.Date.DAY, -7);  
		} else 
		if (key === 'FR30'    ) { /* 금월 */
			sdate = Ext.Date.getFirstDateOfMonth(today);   
			edate = Ext.Date.getLastDateOfMonth (today);   
		} else 
		if (key === 'FR35') { /* 전월 */
			today = Ext.Date.add( Ext.Date.getFirstDateOfMonth(today) , Ext.Date.DAY, -1); //   Ext.Date.getFirstDateOfMonth(today).add( -1 ); 
			sdate = Ext.Date.getFirstDateOfMonth(today);   
			edate = Ext.Date.getLastDateOfMonth (today);   
		}
		
		if (sdate && edate){
			if(me.rootField){
				me.rootField.setValue(Ext.Date.clearTime( sdate ));
			}
			if(me.pairField) {
				me.pairField.setValue(Ext.Date.clearTime( edate ));
			}
		}
		if(me.pickerField){
			me.pickerField.collapse();
		} else {
			me.fireEvent('select', me, sdate, edate);
		}
	}
});
