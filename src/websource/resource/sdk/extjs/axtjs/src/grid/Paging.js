Ext.define('Axt.grid.Paging', {
    extend: 'Ext.toolbar.Paging',
    alias: 'widget.grid-paging',
    dock:'bottom',
    displayInfo: false,
    displayMsg: '{0} - {1}, 총 {2}건',
    emptyMsg: 'No data to display',
    prependButtons : false, //true,
    
    pagingButton : true ,
    
    getPagingItems: function() {
        var me = this;
        //console.debug('xxxxxx' ,me.PagingButton  );
        if (me.pagingButton) {
            return [
              	{
              		itemId: 'first',
              		tooltip: me.firstText,
              		overflowText: me.firstText,
              		iconCls: Ext.baseCSSPrefix + 'tbar-page-first',
              		disabled: true,
              		handler: me.moveFirst,
              		scope: me
              	},{
              		itemId: 'prev',
              		tooltip: me.prevText,
              		overflowText: me.prevText,
              		iconCls: Ext.baseCSSPrefix + 'tbar-page-prev',
              		disabled: true,
              		handler: me.movePrevious,
              		scope: me
              	},'-',
              	me.beforePageText,
              		{
              			xtype: 'numberfield',
              			itemId: 'inputItem',
              			name: 'inputItem',
              			cls: Ext.baseCSSPrefix + 'tbar-page-number',
              			allowDecimals: false,
              			minValue: 1,
              			hideTrigger: true,
              			enableKeyEvents: true,
              			keyNavEnabled: false,
              			selectOnFocus: true,
              			submitValue: false,
              			// mark it as not a field so the form will not catch it when getting fields
              			isFormField: false,
              			width: me.inputItemWidth,
              			margins: '-1 2 3 2',
              			listeners: {
              				scope: me,
              				keydown: me.onPagingKeyDown,
              				blur: me.onPagingBlur
              		}
              	},{	
              		xtype: 'tbtext',
              		itemId: 'afterTextItem',
              		text: Ext.String.format(me.afterPageText, 1)
              	},'-',{
              		itemId: 'next',
              		tooltip: me.nextText,
              		overflowText: me.nextText,
              		iconCls: Ext.baseCSSPrefix + 'tbar-page-next',
              		disabled: true,
              		handler: me.moveNext,
              		scope: me
              	},{
              		itemId: 'last',
              		tooltip: me.lastText,
              		overflowText: me.lastText,
              		iconCls: Ext.baseCSSPrefix + 'tbar-page-last',
              		disabled: true,
              		handler: me.moveLast,
              		scope: me
              	},
              	//'-',
              	{
              		itemId: 'refresh',
              		tooltip: me.refreshText,
              		overflowText: me.refreshText,
              		iconCls: Ext.baseCSSPrefix + 'tbar-loading',
              		disabled: true,
              		handler: me.doRefresh,
              		hidden : true ,
              		scope: me
              	},
              	'-'
             ];
        } else {
        	return [];
        }
        
    }    
    
});