Ext.define('module.sale.salework.view.SaleWorkLayout', { extend: 'Axt.form.Layout',
  	alias      : 'widget.module-salework-layout',
	layout     : 'card',
	activeItem : 0,

	/**
	* 초기화 콤포넌트
	*/
	initComponent : function(config){
		var me = this;
			me.items = [ me.createListCard(), me.createWordCard() ];
			me.callParent(arguments);
	},

	    /**
	    *
	    */
	createListCard : function () {
		var buttons = {
			items : [
				{xtype   : 'tbfill' } ,
				{   xtype   : 'tbspacer'    , width : 10 },
				{   xtype   : 'button'      , text    : Const.SELECT.text , iconCls : Const.SELECT.icon , action  : Const.SELECT.action,cls: 'button-style' },
				{   xtype   : 'tbspacer' }
				]
			},
			card =
			{	layout      : 'border',
				border      : 0 ,
				dockedItems : [ {   xtype : 'module-salework-search'} ],
				items :[
				 	{	xtype   : 'tab-panel',
				 		itemId  : 'mainpanel',
				 		tabBar  : buttons ,
				 		items   :[
				 		 	{	title  : '출고 현황',
				 		 		layout : 'border',
				 		 		border : 0,
				 		 		items  :[
				 		 		 	{	region : 'center',
				 		 		 		layout : 'border',
				 		 		 		border : 0,
				 		 		 		items  :[
				 		 		 			{	xtype  : 'module-salework-lister-master',
												flex   : 2,
												split  : true,
												region : 'north',
												//style  : Const.borderLine.left + Const.borderLine.bottom
											},{ /*  하단  */
												xtype      : 'tab-panel',
												itemId     : 'itempanel',
												split      : true,
												region     : 'center',
												tabPosition: 'bottom',
												flex   : 1 ,//
												items      :[
												 	{	title  : '상품현황',
												 		layout : 'border',
												 		border : 0,
												 		region : 'center',
												 		items  :[
												 		 	{	xtype  : 'module-salework-lister-detail',
												 		 		region : 'center',
												 		 		style  : Const.borderLine.top
												 		 	}
												 		]
												 	},{	title  : '결제현황',
												 		layout : 'border',
												 		border : 0,
												 		region : 'center',
												 		items  :[
												 		 	{	xtype  : 'module-salework-lister-payment',
												 		 		region : 'center',
												 		 		style  : Const.borderLine.top
												 		 	}
												 		]
												 	}
												]
  		   		 		 		 		 	}

//		                                     },
//		                                          /*  하단  */
//		                                     {   xtype  : 'module-salework-lister-detail',
//		                                    	 //region : 'south',
//		                                    	 //height : 300,
//		  		   		 		    	    	 flex   : 1,
//		                                         region : 'center',
//		                                         style  : Const.borderLine.top
		                                     //}
		                                 ]
                                     }
                                ]
  		   		 		    }
  		   		 		]
  		   		    }
  		   	    ]
  		    };
    	  return card;
    },

  	/**
  	 *
  	 */
  	createWordCard : function () {
     	var	card = {
			layout : 'border',
			border : 0 ,
			items : [
				{   xtype:'module-salework-worker-editor', region:'north'  },
			 	{   xtype:'module-salework-worker-lister', region:'center' , style : Const.borderLine.top}
			]
     	};
     	return card;
    }

});
