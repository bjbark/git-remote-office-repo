Ext.define('module.custom.iypkg.item.asmtmast.view.AsmtMastLayout', { extend  : 'Axt.form.Layout',

	alias	: 'widget.module-asmtmast-layout',

	/**
	* 콤포넌트 초기화 이벤트
	 */
	initComponent: function(config){
		var me		= this,
			buttons	= {
				items	: [
					{	xtype  : 'tbfill'
					},{	xtype  : 'button',text   : Const.SELECT.text,iconCls: Const.SELECT.icon,action : Const.SELECT.action ,cls: 'button-style'
					}
				]
			}
		;
		me.dockedItems.push({xtype: 'module-asmtmast-search'}); /* 검색조건  */
		me.items = [
		       { xtype   : 'tab-panel',
		    	 itemId  : 'mainpanel',
		    	 region  : 'center',
		    	 flex    : 1,
		    	 items   : [
		    	      { title  : Language.get('','부자재코드'),
		    	    	layout : 'border',
		    	    	border : 0,
		    	    	items  : [
		    	    	    { xtype  : 'module-asmtmast-master' ,
		    	    	      region : 'west'   ,
		    	    	      style  : Const.borderLine.right ,
		    	    	      flex   : 50,
		    	    	      split  : true ,
		    	    	    },{ xtype  : 'module-asmtmast-detail' ,
		    	    	    	region : 'center' ,
		    	    	    	style  : Const.borderLine.left  ,
		    	    	    	flex   : 50 ,
		    	    	    }
		    	    	]
		    	      }
		    	    ]
		       },{	xtype : 'module-asmtmast-editor', region : 'south',  hidden : false
		       }
		     ];
		me.callParent(arguments);
	}
});