Ext.define('module.custom.iypkg.prod.prodplan.view.ProdPlanDetail4', { extend: 'Axt.form.Editor',
	alias		: 'widget.module-prodplan-detail4',
	width	: 430,
	layout : {
		type: 'border'
	},

	columnLines : true,

	initComponent: function(config){
		var me = this;
		me.items = [me.createwest()];
		me.callParent(arguments)  ;
	},

	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				'->', '-',
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 500,
				region			: 'center',
				border			: 2,
				autoScroll		: true,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 400, labelWidth : 80, labelSeparator : ''},
				items : [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
						items	: [
								{	fieldLabel	: Language.get('','수주번호')	,
									xtype		: 'textfield'						,
									name		: 'invc_numb',
									hidden		: true,
									listeners	:{
										change:function(){
											var invc_numb = this.getValue();
											var results;
											Ext.Ajax.request({
												url		: _global.location.http() + '/custom/iypkg/prod/prodplan/get/detail4.do',
												params	: {
													token : _global.token_id,
													param : JSON.stringify({
														invc_numb		: invc_numb
													})
												},
												async	: false,
												method	: 'POST',
												success	: function(response, request) {
													var result = Ext.decode(response.responseText);
													if	(!result.success ){
														Ext.Msg.error(result.message );
														return;
													} else {
														results = result;
													}
												},
												failure : function(result, request) {
												},
												callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
												}
											});
											if(results){
												var editor = Ext.ComponentQuery.query('module-prodplan-detail4')[0],
													panel     = editor.down('form'),
													plan_qntt_01 = panel.down('[name=plan_qntt_01]'),
													plan_qntt_02 = panel.down('[name=plan_qntt_02]'),
													plan_qntt_03 = panel.down('[name=plan_qntt_03]'),
													plan_qntt_04 = panel.down('[name=plan_qntt_04]'),
													plan_qntt_05 = panel.down('[name=plan_qntt_05]')
													plan_qntt_06 = panel.down('[name=plan_qntt_06]'),
													plan_qntt_07 = panel.down('[name=plan_qntt_07]'),
													mxm2_qntt_01 = panel.down('[name=mxm2_qntt_01]'),
													mxm2_qntt_02 = panel.down('[name=mxm2_qntt_02]'),
													mxm2_qntt_03 = panel.down('[name=mxm2_qntt_03]'),
													mxm2_qntt_04 = panel.down('[name=mxm2_qntt_04]'),
													mxm2_qntt_05 = panel.down('[name=mxm2_qntt_05]'),
													mxm2_qntt_06 = panel.down('[name=mxm2_qntt_06]'),
													mxm2_qntt_07 = panel.down('[name=mxm2_qntt_07]')
												;
												if(results.records.length){
												plan_qntt_01.setValue(results.records[0].plan_qntt_01);
												plan_qntt_02.setValue(results.records[0].plan_qntt_02);
												plan_qntt_03.setValue(results.records[0].plan_qntt_03);
												plan_qntt_04.setValue(results.records[0].plan_qntt_04);
												plan_qntt_05.setValue(results.records[0].plan_qntt_05);
												plan_qntt_06.setValue(results.records[0].plan_qntt_06);
												plan_qntt_07.setValue(results.records[0].plan_qntt_07);
												mxm2_qntt_01.setValue(results.records[0].mxm2_qntt_01);
												mxm2_qntt_02.setValue(results.records[0].mxm2_qntt_02);
												mxm2_qntt_03.setValue(results.records[0].mxm2_qntt_03);
												mxm2_qntt_04.setValue(results.records[0].mxm2_qntt_04);
												mxm2_qntt_05.setValue(results.records[0].mxm2_qntt_05);
												mxm2_qntt_06.setValue(results.records[0].mxm2_qntt_06);
												mxm2_qntt_07.setValue(results.records[0].mxm2_qntt_07);
											}
										}
									}
								}
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
								width	: 105,
								height	: 20,
								margin	: '0 0 2 0',
								items	: [
									{	text	: '공정명', xtype : 'label', style : 'text-align:center;', margin : '4 0 0 0'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
								width	: 105,
								height	: 20,
								margin	: '0 0 2 0',
								items	: [
									{	text	: '재단', xtype : 'label', style : 'text-align:center;', margin : '4 0 0 0'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
								width	: 105,
								height	: 20,
								margin	: '0 0 2 0',
								items	: [
									{	text	: '인쇄', xtype : 'label', style : 'text-align:center;', margin : '4 0 0 0'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
								width	: 105,
								height	: 20,
								margin	: '0 0 2 0',
								items	: [
									{	text	: '로타리', xtype : 'label', style : 'text-align:center;', margin : '4 0 0 0'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
								width	: 105,
								height	: 20,
								margin	: '0 0 2 0',
								items	: [
									{	text	: '톰슨', xtype : 'label', style : 'text-align:center;', margin : '4 0 0 0'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
								width	: 105,
								height	: 20,
								margin	: '0 0 2 0',
								items	: [
									{	text	: '접합', xtype : 'label', style : 'text-align:center;', margin : '4 0 0 0'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
								width	: 105,
								height	: 20,
								margin	: '0 0 2 0',
								items	: [
									{	text	: '완제품', xtype : 'label', style : 'text-align:center;', margin : '4 0 0 0'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
								width	: 105,
								height	: 20,
								margin	: '0 0 2 0',
								items	: [
									{	text	: '조립', xtype : 'label', style : 'text-align:center;', margin : '4 0 0 0'
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	text	: '계획량', xtype : 'label', style : 'text-align:center;', margin		: '6 2 2 2'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	xtype		: 'numericfield',
										name		: 'plan_qntt_01',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	xtype		: 'numericfield',
										name		: 'plan_qntt_02',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	xtype		: 'numericfield',
										name		: 'plan_qntt_03',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	xtype		: 'numericfield',
										name		: 'plan_qntt_04',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	xtype		: 'numericfield',
										name		: 'plan_qntt_05',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	xtype		: 'numericfield',
										name		: 'plan_qntt_06',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	xtype		: 'numericfield',
										name		: 'plan_qntt_07',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	text	: 'm2/총', xtype : 'label', style : 'text-align:center;', margin		: '6 2 2 2'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	xtype		: 'numericfield',
										name		: 'mxm2_qntt_01',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	xtype		: 'numericfield',
										name		: 'mxm2_qntt_02',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	xtype		: 'numericfield',
										name		: 'mxm2_qntt_03',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	xtype		: 'numericfield',
										name		: 'mxm2_qntt_04',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	xtype		: 'numericfield',
										name		: 'mxm2_qntt_05',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	xtype		: 'numericfield',
										name		: 'mxm2_qntt_06',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  +  Const.borderLine.right + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	xtype		: 'numericfield',
										name		: 'mxm2_qntt_07',
										readOnly	: true,
										margin		: '2 2 2 2'
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