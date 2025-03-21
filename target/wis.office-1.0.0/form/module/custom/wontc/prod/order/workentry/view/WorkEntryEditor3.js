Ext.define('module.custom.wontc.prod.order.workentry.view.WorkEntryEditor3', { extend: 'Axt.form.Editor',
	alias		: 'widget.module-wontc-workentry-editor3',
	layout : {
		type: 'border'
	},

	columnLines : true,

	initComponent: function(config){
		var me = this;
		me.items = [me.createwest()];
		me.callParent(arguments)  ;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				region			: 'center',
				margin			: '0 0 0 0',
				autoScroll		: true,
				bodyStyle		: { padding: '5px'},
				items : [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%', minWidth : 1000,
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom + Const.borderLine.right,
								flex	: 1,
								height	: 60,
								items	: [
									{	text	: '* 불량이력 참고', xtype : 'label', style : 'text-align:left; font-size : 2em !important;', margin : '15 0 0 10'
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%', minWidth : 1000,
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom + Const.borderLine.right,
								flex	: 1,
								height	: 280,
								items	: [
									{	xtype		: 'textarea',
										name		: '',
										height		: 280,
										readOnly	: true,
										fieldStyle	: 'font-size : 2em !important; border-color : #99bce8; border-top : none !important; border-right : none !important; border-left : none !important;',
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top  + Const.borderLine.bottom + Const.borderLine.right,
								flex	: 1,
								height	: 280,
								items	: [
									{	xtype		: 'textarea',
										name		: '',
										height		: 280,
										readOnly	: true,
										fieldStyle	: 'font-size : 2em !important; border-color : #99bce8; border-top : none !important; border-right : none !important; border-left : none !important;',
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%', minWidth : 1000,
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								flex	: 1,
								style	: Const.borderLine.right,
								height	: 50,
								items	: [
									{	xtype		: 'textarea',
										name		: '',
										height		: 50,
										readOnly	: true,
										fieldStyle	: 'font-size : 2em !important; border-color : #99bce8; border-right : none !important;',
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								flex	: 1,
								style	: Const.borderLine.right,
								height	: 50,
								items	: [
									{	xtype		: 'textarea',
										name		: '',
										height		: 50,
										readOnly	: true,
										fieldStyle	: 'font-size : 2em !important; border-color : #99bce8; border-left : none !important; border-right : none !important;',
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%', minWidth : 1000,
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.left + Const.borderLine.bottom + Const.borderLine.right,
								flex	: 1,
								height	: 60,
								items	: [
									{	text	: '* 작업시 주의사항', xtype : 'label', style : 'text-align:left; font-size : 2em !important;', margin : '15 0 0 10'
									}
								]
							}
						]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%', minWidth : 1000,
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom + Const.borderLine.right,
								flex	: 1,
								height	: 280,
								items	: [
									{	xtype		: 'textarea',
										name		: '',
										height		: 280,
										fieldStyle	: 'font-size : 2em !important; border-color : #99bce8; border-top : none !important; border-right : none !important; border-left : none !important;',
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top  + Const.borderLine.bottom + Const.borderLine.right,
								flex	: 1,
								height	: 280,
								items	: [
									{	xtype		: 'textarea',
										name		: '',
										height		: 280,
										fieldStyle	: 'font-size : 2em !important; border-color : #99bce8; border-top : none !important; border-right : none !important; border-left : none !important;',
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%', minWidth : 1000,
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								flex	: 1,
								style	: Const.borderLine.right,
								height	: 50,
								items	: [
									{	xtype		: 'textarea',
										name		: '',
										height		: 50,
										fieldStyle	: 'font-size : 2em !important; border-color : #99bce8; border-right : none !important;',
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								flex	: 1,
								style	: Const.borderLine.right,
								height	: 50,
								items	: [
									{	xtype		: 'textarea',
										name		: '',
										height		: 50,
										fieldStyle	: 'font-size : 2em !important; border-color : #99bce8; border-left : none !important; border-right : none !important;',
									}
								]
							}
						]
					}
				]
			}
		;
		return item;
	}
});