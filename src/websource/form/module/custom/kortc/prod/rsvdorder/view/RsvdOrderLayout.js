Ext.define('module.custom.kortc.prod.rsvdorder.view.RsvdOrderLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-rsvdorder-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), me.createWordCard() ];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-rsvdorder-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '오더리스트',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-rsvdorder-lister-master',
									itemId	: 'master1',
									width	: 670,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.right
								},{	xtype	: 'module-rsvdorder-lister-detail', /*  상단  */
									itemId	: 'master2',
									flex	: 1,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.left
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
			layout	: 'border',
			border	: 0 ,
			items	: [
				{	xtype:'module-rsvdorder-worker-editor', region:'north'
				},{	xtype:'module-rsvdorder-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

