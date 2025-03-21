Ext.define('module.custom.hantop.item.itemcam.view.ItemCamLayout', { extend  : 'Axt.form.Layout',

	alias : 'widget.module-itemcam-layout',

	initComponent: function(config){
		var me		= this,
			buttons	= {
				items	: [
					{	xtype	: 'tbfill'
					},{	xtype	: 'button',text   : Const.SELECT.text,iconCls: Const.SELECT.icon,action : Const.SELECT.action ,cls: 'button-style'
					}
				]
			}
		;
		me.dockedItems.push({xtype: 'module-itemcam-search'}); /* 검색조건  */
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: 'BF',
						layout	: 'border' ,
						border	: 0,
						items	: [
							{	xtype	: 'module-itemcam-lister-master' ,
								width	: 260 ,
								split	: true,
								region	: 'center',
								style	: Const.borderLine.right
							}
						]
					},{	title	: 'SF',
						layout	: 'border' ,
						border	: 0,
						items	: [
							{	xtype	: 'module-itemcam-lister-master2' ,
								width	: 260 ,
								split	: true,
								region	: 'center',
								style	: Const.borderLine.right
							}
						]
					},{	title	: 'MF',
						layout	: 'border' ,
						border	: 0,
						items	: [
							{	xtype	: 'module-itemcam-lister-master3' ,
								width	: 260 ,
								split	: true,
								region	: 'center',
								style	: Const.borderLine.right
							}
						]
					},{	title	: 'GB',
						layout	: 'border' ,
						border	: 0,
						items	: [
							{	xtype	: 'module-itemcam-lister-master4' ,
								width	: 260 ,
								split	: true,
								region	: 'center',
								style	: Const.borderLine.right
							}
						]
					},{	title	: 'MC',
						layout	: 'border' ,
						border	: 0,
						items	: [
							{	xtype	: 'module-itemcam-lister-master5' ,
								width	: 260 ,
								split	: true,
								region	: 'center',
								style	: Const.borderLine.right
							}
						]
					},{	title	: 'BF보강재',
						layout	: 'border' ,
						border	: 0,
						items	: [
							{	xtype	: 'module-itemcam-lister-master7' ,
								width	: 260 ,
								split	: true,
								region	: 'center',
								style	: Const.borderLine.right
							}
						]
					},{	title	: 'SF보강재',
						layout	: 'border' ,
						border	: 0,
						items	: [
							{	xtype	: 'module-itemcam-lister-master8' ,
								width	: 260 ,
								split	: true,
								region	: 'center',
								style	: Const.borderLine.right
							}
						]
					},{	title	: 'MF보강재',
						layout	: 'border' ,
						border	: 0,
						items	: [
							{	xtype	: 'module-itemcam-lister-master9' ,
								width	: 260 ,
								split	: true,
								region	: 'center',
								style	: Const.borderLine.right
							}
						]
					},{	title	: '기타',
						layout	: 'border' ,
						border	: 0,
						items	: [
							{	xtype	: 'module-itemcam-lister-master6' ,
								width	: 260 ,
								split	: true,
								region	: 'center',
								style	: Const.borderLine.right
							}
						]
					}
				]
			}
		];
		me.callParent(arguments);
	}
});