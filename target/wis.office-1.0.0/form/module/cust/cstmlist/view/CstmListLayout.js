Ext.define('module.cust.cstmlist.view.CstmListLayout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-cstmlist-layout',

	/**
	* 콤포넌트 초기화 이벤트
	 */
	initComponent: function(config){
		var me      = this,
			buttons = {
				items : [
					{	xtype  : 'tbfill'
					},{	xtype  : 'button',text   : Const.SELECT.text,iconCls: Const.SELECT.icon,action : Const.SELECT.action ,cls: 'button-style'
					}
				]
			}
		;
		me.dockedItems.push({xtype: 'module-cstmlist-search'}); /* 검색조건  */
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title  : '거래처 리스트',
						layout : 'border', //, align: 'stretch'}
						region : 'west',
						border : 0,
						items  : [
							{	xtype  : 'module-cstmlist-lister',
								region : 'west'   ,
								style  : Const.borderLine.right ,
								width  : 330,
								split  : true ,
							},{	xtype	: 'tab-panel',
								itemId	: 'detail',
								items	: [
									{	title : '거래처 세부정보',
										xtype : 'module-cstmlist-editor2',
										height: 374,
									},{	title : '계약내역',
										xtype : 'module-cstmlist-itempric'
									},{	title : '주문내역',
										xtype : 'module-cstmlist-order-lister'
									},{	title : '수불내역',
										xtype : 'module-cstmlist-isos'
									},{	title : '반품내역',
										xtype : 'module-cstmlist-rett'
									},{	title : '방문일지',
										xtype : 'module-cstmlist-visit' ,
									}
								]
							}
						]
					}
				]
			},
			{	xtype  : 'module-cstmlist-editor', region : 'south'
			}
		];
		me.callParent(arguments);
	}
});
























