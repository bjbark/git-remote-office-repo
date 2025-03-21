Ext.define('module.eis.project.costreport.view.CostReportFinder', { extend: 'Axt.form.Editor',

	alias: 'widget.module-costreport-finder',

	width	: 430,
	layout : {
		type: 'border'
	},

	title			: Language.get('prjt_info','수주 정보'),
	collapsible 	: false	,
	collapsed		: false	,
	defaultFocus	: 'pjod_code',

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
				items			: [
					{	name	: 'prjt_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('pjod_idcd', '금형번호'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'pjod_idcd',
								allowBlank	: false,
								clearable	: true ,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
//								width		: 320,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-pjod-popup',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField){
										nameField.setValue(records[0].get('pjod_idcd'));
										var img = null,
											blob = null,
											url = null,
											img2 = null,
											blob2 = null,
											url2 = null
										;
										if(records[0].get('item_imge')){
											img = new Uint8Array(records[0].get('item_imge').split(","));
											blob = new Blob([img],{type:'image/png'})
											url = URL.createObjectURL(blob);
										}
										if(records[0].get('item_imge2')){
											img2 = new Uint8Array(records[0].get('item_imge2').split(","));
											blob2 = new Blob([img2],{type:'image/png'})
											url2 = URL.createObjectURL(blob2);
										}
										var editor = Ext.ComponentQuery.query('module-costreport-finder')[0],
											panel = editor.down('form'),
											cstm_name		= panel.down('[name=cstm_name]'),
											item_name		= panel.down('[name=item_name]'),
											item_spec		= panel.down('[name=item_spec]'),
											item_modl		= panel.down('[name=item_modl]'),
											img				= panel.down('[name=img]'),
											img2			= panel.down('[name=img2]')
										;
										cstm_name.setValue(records[0].get('cstm_name'));
										item_name.setValue(records[0].get('item_name'));
										item_spec.setValue(records[0].get('item_spec'));
										item_modl.setValue(records[0].get('item_modl'));
										img.setValue(url);
										img2.setValue(url2);

										var listermaster1 = Ext.ComponentQuery.query('module-costreport-lister-master1')[0];
										listermaster1.select({
											callback:function(records, operation, success) {
												if (success) {
													listermaster1.getSelectionModel().select(0);
												} else {
												}
											}, scope:me
										}, Ext.merge( {stor_id : _global.stor_id, pjod_idcd : records[0].get('pjod_idcd')}) );
									}
								},
								listeners	:{
									change:function(el,val){
										var pjod_idcd = this.getValue();
										var results;
										if(val.trim()){
											Ext.Ajax.request({
												url		: _global.location.http() + '/eis/project/costreport/get/getcost.do',
												params	: {
													token : _global.token_id,
													param : JSON.stringify({
														pjod_idcd		: pjod_idcd
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
												var editor = Ext.ComponentQuery.query('module-costreport-finder')[0],
													panel     = editor.down('form'),
													t0_mans_amnt = panel.down('[name=t0_mans_amnt]'),
													t1_mans_amnt = panel.down('[name=t1_mans_amnt]'),
													t0_cvic_amnt = panel.down('[name=t0_cvic_amnt]'),
													t1_cvic_amnt = panel.down('[name=t1_cvic_amnt]'),
													t0_mtrl_amnt = panel.down('[name=t0_mtrl_amnt]'),
													t1_mtrl_amnt = panel.down('[name=t1_mtrl_amnt]'),
													t2_mtrl_amnt = panel.down('[name=t2_mtrl_amnt]'),
													t3_mtrl_amnt = panel.down('[name=t3_mtrl_amnt]'),
													t0_otod_amnt = panel.down('[name=t0_otod_amnt]'),
													t1_otod_amnt = panel.down('[name=t1_otod_amnt]'),
													mngr_amnt = panel.down('[name=mngr_amnt]'),
													mgin_amnt = panel.down('[name=mgin_amnt]'),
													totl_amnt = panel.down('[name=totl_amnt]')
													mans_amnt = panel.down('[name=mans_amnt]')
													mtrl_amnt = panel.down('[name=mtrl_amnt]')
													cvic_amnt = panel.down('[name=cvic_amnt]')
													otod_amnt = panel.down('[name=otod_amnt]')
													gfee_rate = panel.down('[name=gfee_rate]')
													pfit_rate = panel.down('[name=pfit_rate]')
												;
												t0_mans_amnt.setValue(results.records[0].t0_mans_amnt);
												t1_mans_amnt.setValue(results.records[0].t1_mans_amnt);
												t0_cvic_amnt.setValue(results.records[0].t0_cvic_amnt);
												t1_cvic_amnt.setValue(results.records[0].t1_cvic_amnt);
												t0_mtrl_amnt.setValue(results.records[0].t0_mtrl_amnt);
												t1_mtrl_amnt.setValue(results.records[0].t1_mtrl_amnt);
												t2_mtrl_amnt.setValue(results.records[0].t2_mtrl_amnt);
												t3_mtrl_amnt.setValue(results.records[0].t3_mtrl_amnt);
												t0_otod_amnt.setValue(results.records[0].t0_otod_amnt);
												t1_otod_amnt.setValue(results.records[0].t1_otod_amnt);
												mngr_amnt.setValue(results.records[0].mngr_amnt);
												mgin_amnt.setValue(results.records[0].mgin_amnt);
												totl_amnt.setValue(results.records[0].totl_amnt);
												mans_amnt.setValue(results.records[0].mans_amnt);
												mtrl_amnt.setValue(results.records[0].mtrl_amnt);
												cvic_amnt.setValue(results.records[0].cvic_amnt);
												otod_amnt.setValue(results.records[0].otod_amnt);
												gfee_rate.setValue(results.records[0].gfee_rate);
												pfit_rate.setValue(results.records[0].pfit_rate);
											}
										}else{
											me.down('form').getForm().reset();
										}
									}
								}
							}
						]
					},{	fieldLabel	: Language.get('cstm_name','고객사명'),
						xtype		: 'textfield',
						name		: 'cstm_name',
					},{	fieldLabel	: Language.get('item_modl','차종'),
						xtype		: 'textfield',
						name		: 'item_modl',
						readOnly	: true
					},{	fieldLabel	: Language.get('acpt_case_name','금형명'),
						xtype		: 'textfield',
						name		: 'item_name',
						readOnly	: true
					},{	fieldLabel	: Language.get('item_spec','규격'),
						xtype		: 'textfield',
						name		: 'item_spec',
						readOnly	: true,
						hidden		: true

					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 84',
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
								width	: 105,
								height	: 20,
								margin	: '0 0 2 0',
								items	: [
									{	text	: '원가구분', xtype : 'label', style : 'text-align:center;', margin : '4 0 0 0'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
								width	: 105,
								height	: 20,
								margin	: '0 0 2 0',
								items	: [
									{	text	: 'T/0 전', xtype : 'label', style : 'text-align:center;', margin : '4 0 0 0'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
								width	: 105,
								height	: 20,
								margin	: '0 0 2 0',
								items	: [
									{	text	: 'T/0 후', xtype : 'label', style : 'text-align:center;', margin : '4 0 0 0'
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 84',
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	text	: '노무비', xtype : 'label', style : 'text-align:center;', margin		: '6 2 2 2'
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
										name		: 't0_mans_amnt',
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
										name		: 't1_mans_amnt',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 84',
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	text	: '재료비', xtype : 'label', style : 'text-align:center;', margin		: '6 2 2 2'
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
										name		: 't0_mtrl_amnt',
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
										name		: 't1_mtrl_amnt',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							}
						]

					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 84',
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	text	: '기타', xtype : 'label', style : 'text-align:center;', margin		: '6 2 2 2'
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
										name		: 't2_mtrl_amnt',
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
										name		: 't3_mtrl_amnt',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 84',
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	text	: '내부가공비', xtype : 'label', style : 'text-align:center;', margin		: '6 2 2 2'
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
										name		: 't0_cvic_amnt',
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
										name		: 't1_cvic_amnt',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 84',
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.bottom  + Const.borderLine.left  ,
								width	: 105,
								height	: 26,
								margin	: '0 0 2 0',
								items	: [
									{	text	: '외부가공비', xtype : 'label', style : 'text-align:center;', margin		: '6 2 2 2'
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
										name		: 't0_otod_amnt',
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
										name		: 't1_otod_amnt',
										readOnly	: true,
										margin		: '2 2 2 2'
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 84',
						items	: [
							{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
								items	: [
									{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										style	: Const.borderLine.bottom  + Const.borderLine.left  ,
										width	: 105,
										height	: 110,
										margin	: '0 0 2 0',
										items	: [
											{	text	: '합계금액', xtype : 'label', style : 'text-align:center;', margin		: '40 2 2 2'
											}
										]
									}
								]
							},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 0 0',
								items	: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
									items	: [
										{	xtype	: 'fieldcontainer'  ,
											layout	: { type: 'vbox', align: 'stretch' } ,
											style	: Const.borderLine.bottom  + Const.borderLine.left  ,
											width	: 105,
											height	: 26,
											margin	: '0 0 2 0',
											items	: [
												{	text	: '노무비', xtype : 'label', style : 'text-align:center;', margin		: '6 2 2 2'
												}
											]
										},{	xtype	: 'fieldcontainer'  ,
											layout	: { type: 'vbox', align: 'stretch' } ,
											style	: Const.borderLine.bottom  + Const.borderLine.left  +  Const.borderLine.right ,
											width	: 105,
											height	: 26,
											margin	: '0 0 2 0',
											items	: [
												{	xtype		: 'numericfield',
													name		: 'mans_amnt',
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
												style	: Const.borderLine.bottom  + Const.borderLine.left ,
												width	: 105,
												height	: 26,
												margin	: '0 0 2 0',
												items	: [
													{	text	: '재료비', xtype : 'label', style : 'text-align:center;', margin		: '6 2 2 2'
													}
												]
											},{	xtype	: 'fieldcontainer'  ,
												layout	: { type: 'vbox', align: 'stretch' } ,
												style	: Const.borderLine.bottom  + Const.borderLine.left +  Const.borderLine.right  ,
												width	: 105,
												height	: 26,
												margin	: '0 0 2 0',
												items	: [
													{	xtype		: 'numericfield',
														name		: 'mtrl_amnt',
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
											style	: Const.borderLine.bottom  + Const.borderLine.left ,
											width	: 105,
											height	: 26,
											margin	: '0 0 2 0',
											items	: [
												{	text	: '내부가공비', xtype : 'label', style : 'text-align:center;', margin		: '6 2 2 2'
												}
											]
										},{	xtype	: 'fieldcontainer'  ,
											layout	: { type: 'vbox', align: 'stretch' } ,
											style	: Const.borderLine.bottom  + Const.borderLine.left +  Const.borderLine.right  ,
											width	: 105,
											height	: 26,
											margin	: '0 0 2 0',
											items	: [
												{	xtype		: 'numericfield',
													name		: 'cvic_amnt',
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
											style	: Const.borderLine.bottom  + Const.borderLine.left,
											width	: 105,
											height	: 26,
											margin	: '0 0 2 0',
											items	: [
												{	text	: '외부가공비', xtype : 'label', style : 'text-align:center;', margin		: '6 2 2 2'
												}
											]
										},{	xtype	: 'fieldcontainer'  ,
											layout	: { type: 'vbox', align: 'stretch' } ,
											style	: Const.borderLine.bottom  + Const.borderLine.left +  Const.borderLine.right  ,
											width	: 105,
											height	: 26,
											margin	: '0 0 2 0',
											items	: [
												{	xtype		: 'numericfield',
													name		: 'otod_amnt',
													readOnly	: true,
													margin		: '2 2 2 2'
												}
											]
										}
									]
								}
								]
							}
						]

					},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '5 0 0 205',
						items	: [
							{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 5 0 5',
								items	: [
									{	fieldLabel	: Language.get('mngr_amnt','관리비'),
										xtype		: 'numericfield',
										name		: 'gfee_rate',
										width		: 85,
										labelWidth	: 50,
										margin		: '0 3 0 0'
									},{	fieldLabel	: Language.get('','%'),
										xtype		: 'numericfield',
										name		: 'mngr_amnt',
										labelWidth	: 10,
										width		: 100,
										readOnly	: true,
									},
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 5 0 5',
								items	: [
									{	fieldLabel	: Language.get('mgin_amnt','이윤'),
										xtype		: 'numericfield',
										name		: 'pfit_rate',
										width		: 85,
										labelWidth	: 50,
										margin		: '0 3 0 0'
									},{	fieldLabel	: Language.get('','%'),
										xtype		: 'numericfield',
										name		: 'mgin_amnt',
										labelWidth	: 10,
										width		: 100,
										readOnly	: true,
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 0 180',
						items	: [
							{	fieldLabel	: Language.get('totl_amnt','원가계'),
								xtype		: 'numericfield',
								name		: 'totl_amnt',
								width		: 218,
								readOnly	: true,
							}
						]
					},{	xtype	: 'button',
						text	: '관리비율저장',
						margin	: '5 0 0 228',
						width	: 170,
						handler	: me.savePercent
					},{	xtype	:'form-panel' ,
						region	:'center',
						layout	: 'border',
						border	: false,
						layout	: { type: 'vbox', align: 'stretch'} ,
						items	: [
							{	xtype	: 'image',
								name	: 'image',
								width	: 300,
								height	: 200,
								margin	: '20 55',
								hidden	:true
							},{	xtype	: 'image',
								name	: 'image2',
								width	: 300,
								height	: 200,
								margin	: '20 55',
								hidden	:true
							},{	xtype		:'textfield',
								name		: 'img',
								hidden		:true,
								listeners	: {
									change:function(val){
										if(val.getValue()){
											this.up('form').down('[name=image]').show();
											this.up('form').down('[name=image]').setSrc(val.getValue());
										}else{
											this.up('form').down('[name=image]').hide();
											this.up('form').down('[name=image]').setSrc('');
										}
									}
								}
							},{	xtype		:'textfield',
								name		: 'img2',
								hidden		:true,
								listeners	: {
									change:function(val){
										if(val.getValue()){
											this.up('form').down('[name=image2]').show();
											this.up('form').down('[name=image2]').setSrc(val.getValue());
										}else{
											this.up('form').down('[name=image2]').hide();
											this.up('form').down('[name=image2]').setSrc();
										}
									}
								}
							},
						]
					}
				]
			}
		;
		return item;
	},
	savePercent:function(){
		var	me					= this,
			editor				= me.up('form'),
			pjod_idcd_form		= editor.down('[name=pjod_idcd]'),
			cstm_name_form		= editor.down('[name=cstm_name]'),
			item_modl_form		= editor.down('[name=item_modl]'),
			acpt_case_name_form	= editor.down('[name=item_name]'),
			item_spec_form		= editor.down('[name=item_spec]'),
			gfee_rate_form		= editor.down('[name=gfee_rate]'),
			pfit_rate_form		= editor.down('[name=pfit_rate]'),
			pjod_idcd			= pjod_idcd_form.getValue(),
			cstm_name			= cstm_name_form.getValue(),
			item_modl			= item_modl_form.getValue(),
			acpt_case_name		= acpt_case_name_form.getValue(),
			item_spec			= item_spec_form.getValue()
			gfee_rate			= gfee_rate_form.getValue()
			pfit_rate			= pfit_rate_form.getValue()
		;

		if(gfee_rate > 0 && pfit_rate > 0){
			console.log(gfee_rate);
			console.log(pfit_rate);
			Ext.Ajax.request({
				url		: _global.location.http() + '/eis/project/costreport/set/savePercent.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						pjod_idcd		: pjod_idcd,
						gfee_rate		: gfee_rate,
						pfit_rate		: pfit_rate
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


			editor.getForm().reset();
			pjod_idcd_form.setValue('');
			pjod_idcd_form.setValue(pjod_idcd);
			cstm_name_form.setValue(cstm_name);
			item_modl_form.setValue(item_modl);
			acpt_case_name_form.setValue(acpt_case_name);
			item_spec_form.setValue(item_spec);
		}
	}
});