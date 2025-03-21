Ext.define('module.notice.noticework.view.NoticeWorkLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-noticework-layout',

	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout		: 'border',
			border		: 0 ,
			dockedItems : [ {xtype: 'module-noticework-search'} ],
			items		: [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '공지사항목록',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-noticework-lister-master', /*  공지사항목록  */
											region	: 'center',
										}
									]
								},{	xtype : 'module-noticework-editor', region : 'south', hidden : false}
							]
						},{	title		: '대상자',
							layout		: 'border',
							border		: 0,
							dockedItems	: [ {xtype: 'module-noticework-lister-item'} ],
							items		: [
								{	xtype	: 'module-noticework-lister-item1',
									flex	: 2,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	xtype	: 'panel',
									region	: 'west',
									width	: 100,
									border	: 0,
									layout	: {
										type	: 'vbox',
										align	: 'center',
										pack	: 'center'
									},
									items	: [
										{	xtype	: 'button',
											action	: 'enrollment',
											text	: '<span class="btnTemp"><</span>',
											cls		: 'button-style',
											margin	: '50 0 0 0',
											width	: 100,
											height	: 50,
											width	: 80,
										},{	xtype	: 'button',
											action	: 'remove',
											text	: '<span class="btnTemp">></span>',
											cls		: 'button-style',
											margin	: '20 0 0 0',
											width	: 100,
											height	: 50,
											width	: 80
										}
									]
								},{	xtype	: 'module-noticework-lister-item2',
									flex	: 2,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title		: '열람자',
							layout		: 'border',
							border		: 0,
							dockedItems	: [ {xtype: 'module-noticework-lister-invoice2'} ],
							items		: [
								{	xtype	: 'module-noticework-lister-invoice',
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.bottom
								}
							]
						}
					]
				}
			]
		}
		return card;
	}
});