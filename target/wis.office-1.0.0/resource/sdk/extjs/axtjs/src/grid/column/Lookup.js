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
 * A Column definition class which renders a numeric data field according to a {@link #format} string.
 *
 *     @example
 *     Ext.create('Ext.data.Store', {
 *        storeId:'sampleStore',
 *        fields:[
 *            { name: 'symbol', type: 'string' },
 *            { name: 'price',  type: 'number' },
 *            { name: 'change', type: 'number' },
 *            { name: 'volume', type: 'number' }
 *        ],
 *        data:[
 *            { symbol: "msft",   price: 25.76,  change: 2.43, volume: 61606325 },
 *            { symbol: "goog",   price: 525.73, change: 0.81, volume: 3053782  },
 *            { symbol: "apple",  price: 342.41, change: 1.35, volume: 24484858 },
 *            { symbol: "sencha", price: 142.08, change: 8.85, volume: 5556351  }
 *        ]
 *     });
 *     
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Number Column Demo',
 *         store: Ext.data.StoreManager.lookup('sampleStore'),
 *         columns: [
 *             { text: 'Symbol',         dataIndex: 'symbol', flex: 1 },
 *             { text: 'Current Price',  dataIndex: 'price',  renderer: Ext.util.Format.usMoney },
 *             { text: 'Change',         dataIndex: 'change', xtype: 'numbercolumn', format:'0.00' },
 *             { text: 'Volume',         dataIndex: 'volume', xtype: 'numbercolumn', format:'0,000' }
 *         ],
 *         height: 200,
 *         width: 400,
 *         renderTo: Ext.getBody()
 *     });
 */
Ext.define('Axt.grid.column.Lookup', { extend: 'Ext.grid.column.Column',
	
	alias: 'widget.lookupcolumn',
	requires:[
	 	'Axt.form.field.LookupField'
	],
	lookupStore : undefined,
	lookupValue : undefined,
	editable    : false ,
	readOnly    : true ,
	displayField : 'name' ,
	valueField   : 'code' ,
	colorField   : 'color',	
	
	
    /**
     * @cfg {Object} scope
     * @hide
     */
//    ,constructor: function() {
//        this.scope = this;
//        this.callParent(arguments);
//    }    
	/**
	 * 콤포넌트 생성 이벤트 
	 */
    initComponent: function() {
    	var me = this;
    	
    	//console.debug( 'readOnly' ,  this.readOnly );
    	
    	if (!me.lookupStore){
        	if (me.lookupValue){
        		if (me.lookupValue instanceof Array ) {  
        			//console.debug( "array true ");
            		me.lookupStore = new Ext.data.ArrayStore({ 
            			 fields :[me.valueField, me.displayField, me.colorField]
            			,data   : me.lookupValue 
            		})
            		if (!this.readOnly){
            			this.editor = {
            				xtype        : 'lookupfield', 
            				store        : this.lookupStore, 
            				valueField   : this.valueField, 
            				displayField : this.displayField,
            				editable     : this.editable
            			};
            		}
        		} else {
        			console.debug( me.lookupValue );
        		}
        	}
    	}
        this.callParent(arguments);
    },
    defaultRenderer: function(value, metaData, record, rowIndex, colIndex, store ){
    	var record, displayValue, displayColor ;
    	
    	if (this.lookupStore){
    		record = this.lookupStore.findRecord(this.valueField, value);
    		if (record) {
    			displayValue = record.get(this.displayField);
    			displayColor = record.get(this.colorField);
    			return displayColor ? '<span style="color:'+ displayColor + ';">'+ displayValue +'</span>' : displayValue ;
    		} else {
    			return value;
    		}
    	} else {
         	return value ;
    	}
    }
});