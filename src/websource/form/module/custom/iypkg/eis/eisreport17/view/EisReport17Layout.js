Ext.define('module.custom.iypkg.eis.eisreport17.view.EisReport17Layout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-eisreport17-layout',

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
		me.dockedItems.push({xtype: 'module-eisreport17-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					{	title	: '손익분기 내역',
						layout		: 'border',
						border		: 0,
						flex		: 1,
						items		: [
							{	xtype	: 'panel',
								region	: 'center',
								layout	: 'border',
								flex	: 1,
								border	: 0,
								items : [
									{	region	: 'west',
										flex	: 1,
										split	: true,
										layout	: 'border',
										items	: [
											{	xtype	: 'module-eisreport17-editor1',
												region	: 'north',
												border	: 0,
												split	: true,
											},{	xtype	: 'module-eisreport17-lister1',
												region	: 'center',
											},{	xtype	: 'panel',
												region	: 'south',
												items	: [
													{	xtype : 'textfield' ,
														labelSeparator : '',
														fieldLabel	: Language.get('','생산액'),
														labelWidth	: 90,
														width		: 275,
														labelStyle	: 'text-align : right;',
														margin		: '3 0 0 0',
													}
												]
											}
										]
									},{	region	: 'west',
										flex	: 1,
										split	: true,
										layout	: 'border',
										items	: [
											{	xtype	: 'module-eisreport17-editor2',
												region	: 'north',
												border	: 0,
												split	: true,
											},{	xtype	: 'module-eisreport17-lister2',
												region	: 'center',
											},{	xtype	: 'panel',
												region	: 'south',
												items	: [
													{	xtype : 'textfield' ,
														labelSeparator : '',
														fieldLabel	: Language.get('','생산액'),
														labelWidth	: 90,
														width		: 275,
														labelStyle	: 'text-align : right;',
														margin		: '3 0 0 0',
													}
												]
											}
										]
									},{	region	: 'west',
										flex	: 1,
										split	: true,
										layout	: 'border',
										items	: [
											{	xtype	: 'module-eisreport17-editor3',
												region	: 'north',
												border	: 0,
												split	: true,
											},{	xtype	: 'module-eisreport17-lister3',
												region	: 'center',
											},{	xtype	: 'panel',
												region	: 'south',
												items	: [
													{	xtype : 'textfield' ,
														labelSeparator : '',
														fieldLabel	: Language.get('','생산액'),
														labelWidth	: 90,
														width		: 275,
														labelStyle	: 'text-align : right;',
														margin		: '3 0 0 0',
													}
												]
											}
										]
									},{	region	: 'west',
										flex	: 1,
										split	: true,
										layout	: 'border',
										items	: [
											{	xtype	: 'module-eisreport17-editor4',
												region	: 'north',
												border	: 0,
												split	: true,
											},{	xtype	: 'module-eisreport17-lister4',
												region	: 'center',
											},{	xtype	: 'panel',
												region	: 'south',
												items	: [
													{	xtype : 'textfield' ,
														labelSeparator : '',
														fieldLabel	: Language.get('','생산액'),
														labelWidth	: 90,
														width		: 275,
														labelStyle	: 'text-align : right;',
														margin		: '3 0 0 0',
													}
												]
											}
										]
									},{	region	: 'center',
										flex	: 1,
										split	: true,
										layout	: 'border',
										items	: [
											{	xtype	: 'module-eisreport17-editor5',
												region	: 'north',
												border	: 0,
												split	: true,
											},{	xtype	: 'module-eisreport17-lister5',
												region	: 'center',
											},{	xtype	: 'panel',
												region	: 'south',
												items	: [
													{	xtype : 'textfield' ,
														labelSeparator : '',
														fieldLabel	: Language.get('','생산액'),
														labelWidth	: 90,
														width		: 275,
														labelStyle	: 'text-align : right;',
														margin		: '3 0 0 0',
													}
												]
											}
										]
									}
								]
							}
						]
					}
				]
			}
		];
		me.callParent(arguments);
	}
});