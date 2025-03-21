Ext.define('module.custom.iypkg.basic.boxtype.view.BoxTypeEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-boxtype-editor',

	height : 450,
	layout : {
	type: 'border'
	},

	title			: Language.get('item_info','상자형식 코드 정보'),
	collapsible 	: true	,
	collapsed		: true	,
	defaultFocus	: 'item_idcd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = [me.createTabs()];
		me.callParent(arguments)  ;
	},

	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				'->', '-',
				{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
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
				width			: 796,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 900, labelWidth : 87, labelSeparator : '' },
				items			: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '1 0 5 0',
					items	: [
					{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('','형식코드'),
									name		: 'bxty_code',
									xtype		: 'textfield',
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									width		: 321,
								},{	xtype		: 'lookupfield',
									name		: 'line_stat',
									width		: 64,
									editable	: false,
									margin		: '0 0 0 5',
									lookupValue	: resource.lookup('line_stat'),
								}
							]
						},{	fieldLabel	: Language.get('','형식명'),
							xtype		: 'textfield',
							name		: 'bxty_name',
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							width		: 390
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('','도면'),
									xtype		: 'textfield',
									name		: 'bxty_imge_name',
									width		: 319,
									hidden		: true,
								},{ xtype		: 'button',
									text		: '도면보기',
									margin		: '0 0 0 4',
									action		: 'showImg',
									hidden		: true
								},{	xtype	: 'form-panel',
									name	: 'uploadForm',
									region	: 'center',
									standardSubmit: false,
									border	:  false,
									url		: 'system/custom/iypkg/basic/boxtype/set/fileUpload.do',
									timeout	: 120000,
									method	: 'POST',
									layout	: { type: 'vbox', align: 'stretch' } ,
									padding	: 0 ,
									layout	: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
									items	:[
										{	xtype		: 'filefield',
											name		: 'files',
											fieldLabel	: '도면',
											itemId		: 'files1',
											msgTarget	: 'side',
											allowBlank	: true,
											clearable	: true ,
											anchor		: '100%',
											margin		: '0 3 0 0',
											width		: 390,
											readOnly	: true,
											labelWidth	: 87,
											buttonOnly	: false,
											buttonText	: '도면올리기',
											regex		: new RegExp('\.(jpg|gif|png|jpeg)', 'i'), // 확장자 제한 정규식
											listeners	: {
												change	: function (field) {
													var file = field.fileInputEl.dom.files[0],
														reader = new FileReader(),
														form = me
													;
													if (file) {
														reader.addEventListener('load', function (event) {
															me.down('[name=imge_chek1]').setValue('Y');
															form.down('[name=image]').setSrc(event.target.result)
//																	Ext.get('prjt_work_imge').dom.src = event.target.result;
														});
														reader.readAsDataURL(file);
													}else{
														me.down('[name=imge_chek1]').setValue('');
														form.down('[name=image]').setSrc('')
													}me.down('[name=modify]').setValue('Y');
												}
											}
										},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle , hidden : true
										},{	name:'imge_chek1', xtype : 'textfield' , value : '', hidden : true
										},{xtype:'hiddenfield', name:'param', value:''
										},{xtype:'hiddenfield', name:'token', value:_global.token_id
										},{xtype:'hiddenfield', name:'bxty_idcd'}
									]
								}
							]
							},{	fieldLabel	: Language.get('','스코어'),
								xtype		: 'lookupfield',
								name		: 'scre_dvcd',
								width		: 320,
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								editable	: false,
								lookupValue	: resource.lookup('scre_dvcd'),
							},{	fieldLabel	: Language.get('modify','수정'),
								xtype		: 'textfield',
								name		: 'modify',
								width		: 170,
								hidden		: true
							}
						]
					},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 1,margin : '0 0 5 0',
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left,
						items	: [
							{	xtype	: 'image',
								name	: 'image',
								id		: 'bxty_imge',
								src		: '',
								width	: 370,
								height	: 120,
								margin	: '0 0 0 20',
								hidden	: false,
							},{	xtype		:'textfield',
//								name		: 'item_imge',
								name		: 'bxty_imge',
								hidden		: true,
								listeners	: {
									change:function(val){
										if(val.getValue()){
											img = new Uint8Array(val.getValue().split(","));
											blob = new Blob([img],{type:'image/png'})
											url = URL.createObjectURL(blob);
											console.log(url,'url');
											this.up('form').down('[name=image]').setSrc(url);
										}else{
											this.up('form').down('[name=image]').setSrc('');
										}
									}
								}
							}
						]
					}
				]
			},{	xtype	: 'fieldcontainer'  ,
				margin	: '5 0 2 0 ',
				items	: [
					{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'hbox', align: 'stretch' } ,
						margin	: '0 0 2 35',
						items	: [
							{	text	: '원단총장', xtype : 'label', style : 'text-align:left;' , margin : '17 5  10',
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
								items	: [
								{	xtype	: 'fieldcontainer'  ,
									layout	: { type: 'vbox', align: 'stretch' } ,
									style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
									width	: 303,
									margin	: '0 0 2 0',
									items	: [
										{	text	: Language.get('fabc_ttln_calc','계산식(L:장 , W:폭 , H:고)'),
											xtype : 'label',
											style : 'text-align:center;',
											margin : '5 0 0 0',
										},{	xtype		: 'textfield',
											name		: 'fabc_ttln_calc',
											margin		: '2 4 2 3',
											listeners	: {
												change	: function (val) {
													val.setValue(me.replaceAt(val))
												}
											}
										}
									]
								},{	xtype	: 'fieldcontainer'  ,
									layout	: { type: 'vbox', align: 'stretch' } ,
									style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
									width	: 63,
									margin	: '0 0 2 0',
									items	: [
										{	text	: Language.get('mxm2_gath','m2접합'),
											xtype : 'label',
											style : 'text-align:center;',
											margin : '5 0 0 0',
										},{	margin		: '2 3 2 3',
											xtype		: 'numericfield',
											name		: 'mxm2_gath',
										}
									]
								},{	xtype	: 'fieldcontainer'  ,
									layout	: { type: 'vbox', align: 'stretch' } ,
									style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
									width	: 63,
									margin	: '0 0 2 0',
									items	: [
										{	text	: Language.get('offr_gath','발주접합'),
											xtype : 'label',
											style : 'text-align:center;',
											margin : '5 0 0 0',
										},{	xtype		: 'numericfield',
											name		: 'offr_gath',
											margin		: '2 3 2 3',
										}
									]
								}
								]
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'hbox', align: 'stretch' } ,
						margin	: '5 0 2 35',
						items	: [
							{	text	: '원단총폭', xtype : 'label', style : 'text-align:left;' , margin : '17 5  10',
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
								items	: [
								{	xtype	: 'fieldcontainer'  ,
									layout	: { type: 'vbox', align: 'stretch' } ,
									style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
									width	: 303,
									margin	: '0 0 2 0',
									items	: [
										{	text	: Language.get('fabc_ttln_calc','계산식(L:장 , W:폭 , H:고)'),
											xtype : 'label',
											style : 'text-align:center;',
											margin : '5 0 0 0',
										},{	xtype		: 'textfield',
											name		: 'fabc_ttwd_calc',
											margin		: '2 4 2 3',
											listeners	: {
												change	: function (val) {
													val.setValue(me.replaceAt(val))
												}
											}
										}
									]
								},{	xtype	: 'fieldcontainer'  ,
									layout	: { type: 'vbox', align: 'stretch' } ,
									style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
									width	: 63,
									margin	: '0 0 2 0',
									items	: [
										{	text	: Language.get('sgam_relx','외낱개여유'),
											xtype : 'label',
											style : 'text-align:center;',
											margin : '5 0 0 0',
										},{	margin		: '2 3 2 3',
											xtype		: 'numericfield',
											name		: 'sgam_relx',
										}
									]
								},{	xtype	: 'fieldcontainer'  ,
									layout	: { type: 'vbox', align: 'stretch' } ,
									style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
									width	: 63,
									margin	: '0 0 2 0',
									items	: [
										{	text	: Language.get('mxm2_fdat_loss','M2재단loss'),
											xtype : 'label',
											style : 'text-align:center;',
											margin : '5 0 0 0',
										},{	xtype		: 'numericfield',
											name		: 'mxm2_fdat_loss',
											margin		: '2 3 2 3',
										},
									]
								},{	xtype	: 'fieldcontainer'  ,
									layout	: { type: 'vbox', align: 'stretch' } ,
									style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
									width	: 63,
									margin	: '0 0 2 0',
									items	: [
										{	text	: Language.get('offr_fdat_loss','발주재단loss'),
											xtype : 'label',
											style : 'text-align:center;',
											margin : '5 0 0 0',
										},{	xtype		: 'numericfield',
											name		: 'offr_fdat_loss',
											margin		: '2 3 2 3',
										},
									]
								}
								]
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'hbox', align: 'stretch' } ,
						margin	: '3 0 2 -5',
						items	: [
							{	text	: '스코어규격계산식', xtype : 'label', style : 'text-align:left;' , margin : '7 5  10',
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
								items	: [
									{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										width	: 60,
										margin	: '0 0 2 0',
										items	: [
											{	margin		: '2 2 2 2',
												xtype		: 'textfield',
												name		: 'scre_calc_1fst',
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										width	: 60,
										margin	: '0 0 2 0',
										items	: [
											{	margin		: '2 2 2 2',
												xtype		: 'textfield',
												name		: 'scre_calc_2snd',
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										width	: 60,
										margin	: '0 0 2 0',
										items	: [
											{	margin		: '2 2 2 2',
												xtype		: 'textfield',
												name		: 'scre_calc_3trd',
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										width	: 60,
										margin	: '0 0 2 0',
										items	: [
											{	margin		: '2 2 2 2',
												xtype		: 'textfield',
												name		: 'scre_calc_4frt',
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										width	: 60,
										margin	: '0 0 2 0',
										items	: [
											{	margin		: '2 2 2 2',
												xtype		: 'textfield',
												name		: 'scre_calc_5fit',
											}
										]
									}
								]
							}
						]
					}
				]
			},{	xtype	: 'fieldcontainer'  ,
//				style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left,
				margin	: '5 0 2 0 ',
				items	: [
					{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'hbox', align: 'stretch' } ,
						margin	: '5 0 2 40',
						items	: [
							{	text	: '2합총장', xtype : 'label', style : 'text-align:left;' , margin : '17 5  10',
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
								items	: [
								{	xtype	: 'fieldcontainer'  ,
									layout	: { type: 'vbox', align: 'stretch' } ,
									style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  +  Const.borderLine.left  ,
									width	: 303,
									margin	: '0 0 2 0',
									items	: [
										{	text	: Language.get('fabc_ttln_calc','계산식'),
											xtype : 'label',
											style : 'text-align:center;',
											margin : '5 0 0 0',
										},{	xtype		: 'textfield',
											name		: 'tsum_ttln_calc',
											margin		: '2 4 2 3',
											listeners	: {
												change	: function (val) {
													val.setValue(me.replaceAt(val))
												}
											}
										}
									]
								},{	xtype	: 'fieldcontainer'  ,
									layout	: { type: 'vbox', align: 'stretch' } ,
									style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
									width	: 63,
									margin	: '0 0 2 0',
									items	: [
										{	text	: Language.get('','2합기준'),
											xtype : 'label',
											style : 'text-align:center;',
											margin : '5 0 0 0',
										},{	margin		: '2 3 2 3',
											xtype		: 'numericfield',
											name		: 'tsum_stnd',
										}
									]
								},{	xtype	: 'fieldcontainer'  ,
									layout	: { type: 'vbox', align: 'stretch' } ,
									style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
									width	: 63,
									margin	: '0 0 2 0',
									items	: [
										{	text	: Language.get('mxm2_tsum','m2/2합'),
											xtype : 'label',
											style : 'text-align:center;',
											margin : '5 0 0 0',
										},{	xtype		: 'numericfield',
											name		: 'mxm2_tsum',
											margin		: '2 3 2 3',
										}
									]
								},{	xtype	: 'fieldcontainer'  ,
									layout	: { type: 'vbox', align: 'stretch' } ,
									style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
									width	: 63,
									margin	: '0 0 2 0',
									items	: [
										{	text	: Language.get('offr_tsum','발주/2합'),
											xtype : 'label',
											style : 'text-align:center;',
											margin : '5 0 0 0',
										},{	xtype		: 'numericfield',
											name		: 'offr_tsum',
											margin		: '2 3 2 3',
										}
									]
								}
								]
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'hbox', align: 'stretch' } ,
						margin	: '3 0 2 37',
						items	: [
							{	text	: '생산정보', xtype : 'label', style : 'text-align:left;' , margin : '15 5  10',
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
								items	: [
									{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										width	: 90,
										margin	: '0 0 2 0',
										items	: [
											{	fieldLabel	: Language.get('minm_leng','최소장'),
												labelWidth	: 40,
												margin		: '2 2 2 0',
												xtype		: 'numericfield',
												name		: 'minm_leng',
												labelWidth	: 33,
											},{	fieldLabel	: Language.get('maxm_leng','최대장'),
												labelWidth	: 33,
												margin		: '2 2 2 0',
												xtype		: 'numericfield',
												name		: 'maxm_leng',
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox', align: 'stretch' } ,
										width	: 109,
										margin	: '0 0 2 0',
										items	: [
											{	fieldLabel	: Language.get('minm_widh','최소폭'),
												margin		: '2 2 2 2',
												xtype		: 'numericfield',
												name		: 'minm_widh',
												labelWidth	: 50,
											},{	fieldLabel	: Language.get('maxm_widh','최대폭'),
												margin		: '2 2 2 2',
												xtype		: 'numericfield',
												name		: 'maxm_widh',
												labelWidth	: 50,
											}
										]
									},{	xtype	: 'fieldcontainer'  ,
										layout	: { type: 'vbox' } ,
										margin	: '0 0 2 5',
										items	: [
											{	xtype	: 'fieldcontainer'  ,
												layout	: { type: 'hbox', align: 'stretch' } ,
												margin	: '0 0 2 42',
												items	: [
													{	text	: '장/폭/고', xtype : 'label', style : 'text-align:left;' , margin : '7 5  10',
													},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
														items	: [
															{	xtype	: 'fieldcontainer'  ,
																layout	: { type: 'vbox', align: 'stretch' } ,
																width	: 64,
																margin	: '0 0 2 0',
																items	: [
																	{	margin		: '2 2 2 2',
																		xtype		: 'numericfield',
																		name		: 'bxty_leng',
																	}
																]
															},{	xtype	: 'fieldcontainer'  ,
																layout	: { type: 'vbox', align: 'stretch' } ,
																width	: 64,
																margin	: '0 0 2 0',
																items	: [
																	{	margin		: '2 2 2 2',
																		xtype		: 'numericfield',
																		name		: 'bxty_widh',
																	}
																]
															},{	xtype	: 'fieldcontainer'  ,
																layout	: { type: 'vbox', align: 'stretch' } ,
																width	: 64,
																margin	: '0 0 2 0',
																items	: [
																	{	margin		: '2 2 2 2',
																		xtype		: 'numericfield',
																		name		: 'bxty_hght',
																	}
																]
															}
														]
													}
												]
											},{	xtype		: 'button',
												text		: '<span class="btnTemp" style="font-size:1.5em !important;">계산적용</span>',
												margin		: '0 0 3 51',
												width		: 236,
												handler		: me.calc,
												cls			: 'button-style'
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
		;
		return item;
	},

	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1() ]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title		:  Language.get('','메모'),
				layout		: 'hbox'		,
				border		: 0				,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '내용를 입력하여 주십시오',
						height		: 358,
						flex		: 1
					},{	fieldLabel	: '' ,
						name		: 'lookup_val',
						xtype		: 'textarea'  ,
						readOnly	: true,
						hidden		: true
					}
				]
			}
		;
		return item;
	},

	replaceAt : function(val){
		var array  = ['L','l','W','w','H','h','-','+','/','*','[',']','{','}','(',')','0','1','2','3','4','5','6','7','8','9'],
			value = val.getValue(),
			string, check, set = []
		;
		string = value.split("");
		for(var i=0; i < string.length ; i++){
			for(var j=0; j< array.length; j++){
				if(string[i] == array[j]){
					check = true;
					break;
				}else {
					check = false;
				}
			}
			if(check == false){
				string.pop();
			}
		}
		return string.join('');
	}
});