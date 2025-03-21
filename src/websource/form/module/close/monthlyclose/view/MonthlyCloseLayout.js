Ext.define('module.close.monthlyclose.view.MonthlyCloseLayout', { extend: 'Axt.form.Layout' ,


	alias: 'widget.module-monthlyclose-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
    	var me = this;
    	me.items = [ me.createListCard() ];
        me.callParent(arguments);
	},

	/**
	 *
	 */
  	createListCard : function () {
  		var buttons =
  		{
  			items:
  			[
  			 	{ 	xtype : 'tbfill' } ,
  			 	{   xtype   : 'button'      ,
  			 		text    : Const.SELECT.text ,
  			 		iconCls : Const.SELECT.icon ,
  			 		action  : Const.SELECT.action,
  			 		cls: 'button-style'
  			 	},{	xtype   : 'tbspacer'
  			 	}
  			]
  		},
  		card =
  		{
  			layout: 'border',
  			border: 0 ,
  			dockedItems : [ {xtype: 'module-monthlyclose-search'} ],
  			items :
  			[
  			 	{
  			 		xtype   : 'tab-panel',
  			 		itemId  : 'mainpanel',
  			 		tabBar  :  buttons ,
  			 		items   :
  			 		[
  			 		 	{   title  : '월마감 리스트',
  			 		 		layout : 'border' ,
  			 		 		border : 0,
  			 		 		items  :
  			 		 		[
  			 		 		 	{   xtype  : 'module-monthlyclose-lister' ,
  			 		 		 		region : 'center'
  			 		 		 		//style  : Const.borderLine.right
  			 		 		 	//},{
  			 		 		 	//	xtype  : 'module-monthlyclose-lister-detail' ,
  			 		 		 	//	region : 'center' ,
  			 		 		 	//	style  : Const.borderLine.left
  			 		 		 	}
  			 		 		]
  			 		 	}
  			 		 ]
  			 	}
  			]
  		};
    	return card;
    }
});
