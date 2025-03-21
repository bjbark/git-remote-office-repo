Ext.define('module.custom.hantop.sale.estientry.view.EstiEntryPopup', { extend: 'Axt.popup.Search',
	alias	: 'widget.module-estientry-popup',
	requires: [

	],
	title	: '견적관리 소요자재산출',
	closable: true,
	autoShow: true,
	width	: 1310,
	height	: 800,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [me.createGrid(), me.createForm(), me.createGrid2()];
		me.callParent(arguments);

		if(me.popup.params){
			me.down('form').loadRecord(me.popup.params.record);
		}
	},

	createGrid : function() {
		var me = this,
			grid = {
			xtype		: 'grid-panel',
			region		: 'west',
			flex		: 2.3,
			viewConfig	: {
				loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
			},
//			store	: Ext.create(me.store),
			paging	: {
				xtype	: 'grid-paging'
			},
			columns: [
				{	dataIndex:	'line_stat'	, width:  50, align : 'center' , text: Language.get( 'line_stat'	, '사용'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'line_stat' ),
				},{	dataIndex:	''	, width: 100, align : 'center' , text: Language.get( ''	, '세트코드'	)
				},{	dataIndex:	''	, flex :   1, align : 'left'   , text: Language.get( ''	, '세트명'	)
				}
			]
		};
	return grid;
	},

	createForm : function(){
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			region		: 'center',
			flex		: 6.8,
			bodyStyle	: { padding: '5px' },
			items		: [
				{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0,
					items	: [
						{	xtype	: 'fieldset', layout: 'vbox' , padding:'0', border: 0,
							flex	: 6.5,
							items	: [
								{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0,
									height	: 45,
									width	: '100%',
									style	: 'background-color : blue;',
									items	: [
										{	xtype		: 'label',
											margin		: '15 0 0 12',
											style		: 'font-size:11px!important; color:white;',
											text		: '원자재LOSS : '
										},{	xtype		: 'label',
											margin		: '15 5 0 5',
											style		: 'text-align : right; font-size:11px!important; color:white;',
											text		: '',
											width		: 25,
											listeners	: {
												render : function() {
													var me	= this
														val	= Ext.ComponentQuery.query('module-estientry-worker-editor')[0].down('[name=bsmt_loss_rate]').getValue();
													if(val != null){
														me.setText(val);
													}else{
														me.setText('0');
													}
												},
											}
										},{	xtype		: 'label',
											margin		: '15 0 0 -2',
											style		: 'font-size:11px!important; color:white;',
											text		: '%'
										},{	xtype		: 'label',
											margin		: '15 0 0 15',
											style		: 'font-size:11px!important; color:white;',
											text		: '부자재LOSS : '
										},{	xtype		: 'label',
											margin		: '15 5 0 5',
											style		: 'text-align : right; font-size:11px!important; color:white;',
											text		: '',
											width		: 25,
											listeners	: {
												render : function() {
													var me	= this
														val	= Ext.ComponentQuery.query('module-estientry-worker-editor')[0].down('[name=asmt_loss_rate]').getValue();
													if(val != null){
														me.setText(val);
													}else{
														me.setText('0');
													}
												},
											}
										},{	xtype		: 'label',
											margin		: '15 0 0 -2',
											style		: 'font-size:11px!important; color:white;',
											text		: '%'
										},{	xtype		: 'label',
											margin		: '15 0 0 15',
											style		: 'font-size:11px!important; color:white;',
											text		: '용접LOSS : '
										},{	xtype		: 'label',
											margin		: '15 5 0 5',
											style		: 'text-align : right; font-size:11px!important; color:white;',
											text		: '',
											width		: 25,
											listeners	: {
												render : function() {
													var me	= this
														val	= Ext.ComponentQuery.query('module-estientry-worker-editor')[0].down('[name=weld_loss_rate]').getValue();
													if(val != null){
														me.setText(val);
													}else{
														me.setText('0');
													}
												},
											}
										},{	xtype		: 'label',
											margin		: '15 0 0 -2',
											style		: 'font-size:11px!important; color:white;',
											text		: '%'
										},{	xtype		: 'label',
											margin		: '15 0 0 15',
											style		: 'font-size:11px!important; color:white;',
											text		: '보강비스 : '
										},{	xtype		: 'label',
											margin		: '15 5 0 5',
											style		: 'text-align : right; font-size:11px!important; font-size:11px!important; color:white;',
											text		: '',
											width		: 32,
											listeners	: {
												render : function() {
													var me	= this
														val	= Ext.ComponentQuery.query('module-estientry-worker-editor')[0].down('[name=rein_viss_itvl]').getValue();
													if(val != null){
														me.setText(val);
													}else{
														me.setText('0');
													}
												},
											}
										},{	xtype		: 'label',
											margin		: '15 0 0 -2',
											style		: 'font-size:11px!important; color:white;',
											text		: 'mm'
										},{	xtype		: 'label',
											margin		: '15 0 0 15',
											style		: 'font-size:11px!important; color:white;',
											text		: '앵커부착 : '
										},{	xtype		: 'label',
											margin		: '15 5 0 5',
											style		: 'text-align : right; font-size:11px!important; font-size:11px!important; color:white;',
											text		: '',
											width		: 32,
											listeners	: {
												render : function() {
													var me	= this
														val	= Ext.ComponentQuery.query('module-estientry-worker-editor')[0].down('[name=ancr_atch_itvl]').getValue();
													if(val != null){
														me.setText(val);
													}else{
														me.setText('0');
													}
												},
											}
										},{	xtype		: 'label',
											margin		: '15 0 0 -2',
											style		: 'font-size:11px!important; color:white;',
											text		: 'mm'
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '-3 0 0 0',
									items	: [
										{	fieldLabel	: Language.get('ispl_name', '설치위치' ),
											name		: 'ispl_name',
											xtype		: 'textfield',
											width		: 215,
											labelWidth	: 80
										},{	fieldLabel	: Language.get('invc_qntt', '수량' ),
											name		: 'invc_qntt',
											xtype		: 'numericfield',
											width		: 90,
											labelWidth	: 40,
										},{	fieldLabel	: Language.get('brnd_bacd', '브랜드' ),
											name		: 'base_name',
											xtype		: 'popupfield',
											editable	: false,
											enableKeyEvents : true,
											clearable	: true,
											pair		: 'brnd_bacd',
											width		: 300,
											labelWidth	: 75,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-base-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '4000' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('base_name'));
													pairField.setValue(records[0].get('base_code'));
												}
											},
											listeners : {
												render : function(){
													var val = Ext.ComponentQuery.query('module-estientry-worker-editor')[0].down('[name=base_name2]').getValue(),
														me = this
													;
													me.setValue(val);
												},
												change : function(){
													if(this.getValue() == ''){
														me.down('[name=brnd_bacd]').setValue('');
													}
												},
											}
										}
									]
								},{ xtype	: 'textfield', name : 'brnd_bacd', hidden : true,
									listeners : {
										render : function(){
											var val = Ext.ComponentQuery.query('module-estientry-worker-editor')[0].down('[name=brnd_bacd2]').getValue(),
											me = this
										;
											me.setValue(val);
										},
										change : function(){
											me.down('[name=modl_name]').popup.params = { stor_grp : _global.stor_grp, dvcd : 'esti', brnd_bacd : this.getValue() } ;
										}
									}
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '4 0 0 0',
									items	: [
										{	fieldLabel	: Language.get('modl_name','창호모델'),
											xtype		: 'popupfield',
											editable	: false,
											enableKeyEvents : true,
											name		: 'modl_name',
											pair		: 'wndw_modl_idcd',
											clearable	: true,
											width		: 305,
											labelWidth	: 80,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-hntop-model-popup',
												params : { stor_grp : _global.stor_grp, dvcd : 'esti' },
												result : function(records, nameField, pairField) {
													var popup = Ext.ComponentQuery.query('module-estientry-popup')[0];
													nameField.setValue(records[0].get('modl_name'));
													pairField.setValue(records[0].get('wndw_modl_idcd'));

													popup.down('[name=wdbf_itid]').setValue(records[0].get('wdbf_itid'));
													popup.down('[name=wdsf_itid]').setValue(records[0].get('wdsf_itid'));
													popup.down('[name=wdbf_auto_cutt_yorn]').setValue(records[0].get('wdbf_auto_cutt_yorn'));
													popup.down('[name=wdbf_auto_weld_yorn]').setValue(records[0].get('wdbf_auto_weld_yorn'));
													popup.down('[name=wdsf_auto_cutt_yorn]').setValue(records[0].get('wdsf_auto_cutt_yorn'));
													popup.down('[name=wdsf_auto_weld_yorn]').setValue(records[0].get('wdsf_auto_weld_yorn'));
												},
											},
											listeners : {
												click : function(){
													console.log('agag');
												}
											}
										},{ xtype		: 'textfield', name : 'wdbf_itid', hidden : true
										},{ xtype		: 'textfield', name : 'wdsf_itid', hidden : true
										},{ xtype		: 'textfield', name : 'wndw_modl_idcd', hidden : true
										},{ xtype		: 'textfield', name : 'wdbf_auto_cutt_yorn', hidden : true
										},{ xtype		: 'textfield', name : 'wdbf_auto_weld_yorn', hidden : true
										},{ xtype		: 'textfield', name : 'wdsf_auto_cutt_yorn', hidden : true
										},{ xtype		: 'textfield', name : 'wdsf_auto_weld_yorn', hidden : true
										},{	fieldLabel	: Language.get('item_widh', 'W' ),
											name		: 'item_widh',
											xtype		: 'numericfield',
											width		: 155,
											labelWidth	: 75
										},{	fieldLabel	: Language.get('item_hght', 'H' ),
											name		: 'item_hght',
											xtype		: 'numericfield',
											width		: 145,
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '4 0 0 0',
									items	: [
										{	fieldLabel	: Language.get('wdsf_rate_name','창호형태'),
											xtype		: 'popupfield',
											editable	: false,
											enableKeyEvents : true,
											name		: 'wdsf_rate_name',
											pair		: 'wdtp_idcd',
											clearable	: true,
											width		: 305,
											labelWidth	: 80,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-hntop-type-popup',
												params : { stor_grp : _global.stor_grp },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('wdtp_name'));
													pairField.setValue(records[0].get('wdtp_idcd'));
													var popup = Ext.ComponentQuery.query('module-estientry-popup')[0],
														name  = records[0].get('wdtp_name'),
														name2 = '2W'
													;

													//창호형태가 2W인것만 VENT 선택 가능, 선택하지않으면 X로 value set
													if(name.search(name2.toUpperCase()) == '0'){
														popup.down('[name=vent]').setReadOnly(false);
													}else{
														popup.down('[name=vent]').setReadOnly(true);
													}
												}
											},
										},{ xtype		: 'textfield', name : 'wdtp_idcd', hidden : true
										},{	fieldLabel	: Language.get('item_widh_1fst', 'W1' ),
											name		: 'item_widh_1fst',
											xtype		: 'numericfield',
											width		: 155,
											labelWidth	: 75
										},{	fieldLabel	: Language.get('item_hght_1fst', 'H1' ),
											name		: 'item_hght_1fst',
											xtype		: 'numericfield',
											width		: 145,
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '4 0 0 0',
									items	: [
										{	fieldLabel	: Language.get('rpst_wryp_name', '대표색상' ),
											name		: 'rpst_wryp_name',
											xtype		: 'textfield',
											width		: 305,
											labelWidth	: 80,
										},{	xtype		: 'checkbox',
											boxLabel	: '틀',
											name		: 'wdbf_incl_yorn',
											labelWidth	: 30,
											width		: 80,
											value		: true,
											margin		: '0 0 0 80',
											inputValue	: '1',
										},{	xtype		: 'checkbox',
											boxLabel	: '짝',
											name		: 'wdsf_incl_yorn',
											labelWidth	: 50,
											width		: 80,
											value		: true,
											inputValue	: '1',
										},{	xtype		: 'checkbox',
											boxLabel	: '망',
											name		: 'moss_incl_yorn',
											labelWidth	: 50,
											width		: 80,
											value		: true,
											inputValue	: '1',
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '4 0 0 0',
									items	: [
										{	fieldLabel	: '레핑틀림',
											xtype		: 'checkboxgroup',
											width		: 78,
											margin		: '0 0 0 8',
										},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
											items		: [
												{	xtype			: 'checkboxfield',
													labelSeparator	: '',
													allowBlank		: true,
													name			: 'wryp_shio_twis',
													inputValue		: 1,
													width			: 50 ,
												}
											]
										},{	fieldLabel	: '방충망',
											name		: 'moss_itid',
											xtype		: 'textfield',
											width		: 168,
											labelWidth	: 35,
											value		: 'AL SCREEN',
											fieldStyle	: 'text-align: center;'
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '-4 0 0 0',
									items	: [
												{	fieldLabel	: '레핑(내부)',
													name		: 'inwp_itid',
													xtype		: 'textfield',
													width		: 305,
													labelWidth	: 80,
												},{	fieldLabel	: '레핑(외부)',
													name		: 'otwp_itid',
													xtype		: 'textfield',
													width		: 300,
													labelWidth	: 74,
												}
											]
										},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '4 0 0 6',
									items	: [
										{	fieldLabel	: 'VENT',
											xtype		: 'radiogroup',
											width		: 30,
											name		: 'vent',
											items: [
												{	boxLabel: '좌', name: 'vent_plac_dvcd', inputValue: 'L', checked: true, margin : '0 8 0 0'
												},{	boxLabel: '우', name: 'vent_plac_dvcd', inputValue: 'R', margin : '0 0 0 8'
												}
											]
										},{	fieldLabel	: '조립',
											xtype		: 'checkboxgroup',
											width		: 78,
											margin		: '0 0 0 171',
											hidden		: true
										},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, hidden : true,
											items		: [
												{	xtype			: 'checkboxfield',
													labelSeparator	: '',
													allowBlank		: true,
													boxLabel		: '' ,
													name			: '',
													inputValue		: 1,
													width			: 50 ,
												}
											]
										},{	fieldLabel	: Language.get('ings_tick', '유리(내창)' ),
											name		: 'ings_tick',
											xtype		: 'numericfield',
											width		: 105,
											labelWidth	: 50,
											margin		: '0 0 9 293'
										},{	text		: 'mm',
											xtype		: 'label',
											margin		: '5 0 0 2',
											width		: 10,
											style		:{'font-size':'3px!important'},
											labelStyle	:{'font-size':'3px!important'}
										},{	fieldLabel	: Language.get('otgs_tick', '유리(외창)' ),
											name		: 'otgs_tick',
											xtype		: 'numericfield',
											width		: 125,
											margin		: '0 0 0 5'
										},{	text		: 'mm',
											xtype		: 'label',
											margin		: '5 0 0 2',
											width		: 20,
											style		:{'font-size':'3px!important'},
											labelStyle	:{'font-size':'3px!important'}
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '-7 0 0 6',
									items	: [
										{	fieldLabel	: 'BF보강재',
											xtype		: 'radiogroup',
											width		: 170,
											items: [
												{	boxLabel: '제외', name: 'bfrn_incl_yorn', inputValue: '0', checked: true
												},{	boxLabel: '포함', name: 'bfrn_incl_yorn', inputValue: '1'
												}
											]
										},{	fieldLabel	: '수량',
											xtype		: 'radiogroup',
											width		: 140,
											labelWidth	: 30,
											items: [
												{	boxLabel: '전체', name: 'rein_qntt_dvcd', inputValue: '0', checked: true
												},{	boxLabel: '1줄', name: 'rein_qntt_dvcd', inputValue: '1'
												}
											]
										},{	fieldLabel	: '유리금액',
											xtype		: 'radiogroup',
											width		: 200,
											labelWidth	: 60,
											items: [
												{	boxLabel: '제외', name: 'glss_amnt_incl_yorn', inputValue: '0', checked: true
												},{	boxLabel: '포함', name: 'glss_amnt_incl_yorn', inputValue: '1'
												}
											]
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '2 0 0 6',
									items	: [
										{	fieldLabel	: '보양카바',
											xtype		: 'radiogroup',
											width		: 170,
											items: [
												{	boxLabel: '제외', name: 'bycv_incl_yorn', inputValue: '0', checked: true
												},{	boxLabel: '포함', name: 'bycv_incl_yorn', inputValue: '1'
												}
											]
										},{	fieldLabel	: Language.get('hndl_hght', '핸들높이' ),
											name		: 'hndl_hght',
											xtype		: 'numericfield',
											width		: 155,
											labelWidth	: 80,
											margin		: '0 0 0 123'
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '4 0 0 0',
									items	: [
										{	fieldLabel	: Language.get('remk_text', '비고' ),
											name		: 'remk_text',
											xtype		: 'textarea',
											width		: 605,
											height		: 40,
											labelWidth	: 80
										}
									]
								}
							]
						},{	xtype	: 'fieldset', layout: 'vbox' , padding:'0', border: 0,
							height	: 465,
							flex	: 3.5,
							items	: [
								{	xtype	: 'image',
									name	: 'image',
									src		: '',
									width	: 330,
									height	: 330,
									style	:  'border : 1px solid #99bce8',
									margin	: '2 0 0 5',
								}
							]
						}
					]
				}
			]
		};
		return item;
	},

	createGrid2 : function() {
		var me = this,
			grid = {
				xtype		: 'tab-panel',
				header		: false,
				region		: 'south',
				flex		: 8.2,
				items	: [
					{	title	: '세부정보',
						layout	: 'border' ,
						border	: 0,
						items	: [
							{	xtype	: 'grid-panel',
								region	: 'center',
								style	: Const.borderLine.top,
								paging	: {
									xtype	: 'grid-paging',
									items	: [
										'-',
										{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '0 0 0 0',
											items	: [
												{	xtype		: 'checkbox',
													boxLabel	: '전체',
													name		: 'bfsf_dvcd',
													width		: 50,
													margin		: '0 0 0 10'
												},{	xtype		: 'checkbox',
													boxLabel	: '틀',
													name		: 'bfsf_dvcd1',
													width		: 50,
													margin		: '0 0 0 10'
												},{	xtype		: 'checkbox',
													boxLabel	: '짝',
													name		: 'bfsf_dvcd2',
													width		: 50
												},{	xtype		: 'checkbox',
													boxLabel	: '망',
													name		: 'bfsf_dvcd3',
													width		: 50,
												}
											]
										},
										'-',
										{	text : '<span class="write-button">계산</span>'	, action : ''	, cls: 'button1-style'	} , '-',
										{	text : '<span class="write-button">추가</span>'	, action : ''	, cls: 'button1-style'	} , '-', '-',
										{	text : '<span class="write-button">저장후 품목추가</span>', action : ''	, cls: 'button1-style', width : 130	} , '-',
										'-', '->' ,
										{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
										{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
									]
								},
								columns: [
									{	dataIndex:	''		, text: Language.get( ''			, '순번'		), width :  50, align : 'center'
									},{	dataIndex:	''		, text: Language.get( ''			, '품목코드'	), width : 200, align : 'center'
									},{	dataIndex:	''		, text: Language.get( ''			, '품목명'		), flex  :   1, align : 'left'
									},{	dataIndex:	''		, text: Language.get( ''			, '품목규격'	), width : 200, align : 'left'
									},{	dataIndex:	''		, text: Language.get( ''			, '단위'		), width :  80, align : 'center'
									},{	dataIndex:	''		, text: Language.get( ''			, '계산공식'	), flex  :   1, align : 'left'
									},{	dataIndex:	''		, text: Language.get( ''			, '소요량'		), width :  80, align : 'right'
									},{	dataIndex:	''		, text: Language.get( ''			, '필수여부'	), width :  80, align : 'center'
									}
								]
							}
						]
					}
				]
			};
		return grid;
	},


	finishAction : function(){
		var me		= this,
			record	= undefined
			store	= Ext.ComponentQuery.query('module-estientry-worker-lister')[0].getStore(),
			values	= me.down('form').getValues(),
			uper_seqn	= 0,
			name	= values.wdsf_rate_name,
			name2	= '2W',
			vent_plac_dvcd = undefined
		;
		//창호형태가 2W인것만 VENT 선택 가능, 선택하지않으면 X로 value set
		if(name.search(name2.toUpperCase()) == '0'){
			vent_plac_dvcd = values.vent_plac_dvcd;
		}else{
			vent_plac_dvcd = 'X';
		}

		if(values.ispl_name == ''){
			Ext.Msg.alert("알림", "설치위치를 입력하여 주십시오.");
			return;
		}
		if(values.invc_qntt == null){
			Ext.Msg.alert("알림", "수량을 입력하여 주십시오.");
			return;
		}
		if(values.brnd_bacd == ''){
			Ext.Msg.alert("알림", "브랜드를 선택하여 주십시오.");
			return;
		}
		if(values.wndw_modl_idcd == ''){
			Ext.Msg.alert("알림", "창호모델을 선택하여 주십시오.");
			return;
		}
		if(values.item_widh == null){
			Ext.Msg.alert("알림", "길이를 입력하여 주십시오.");
			return;
		}
		if(values.item_hght == null){
			Ext.Msg.alert("알림", "높이를 입력하여 주십시오.");
			return;
		}
		if(values.rpst_wryp_name == ''){
			Ext.Msg.alert("알림", "대표색상을 입력하여 주십시오.");
			return;
		}
		if(values.ings_tick == ''){
			Ext.Msg.alert("알림", "유리두께를 입력하여 주십시오.");
			return;
		}

		store.each(function(record){
			uper_seqn = record.get('line_seqn');
		})
		if (uper_seqn == undefined) {
			uper_seqn = 0;
		}

		if(me.popup.params){
			var record = me.popup.params.record;
			if(record){
				record.set('base_name', values.base_name);
				record.set('brnd_bacd', values.brnd_bacd);
				record.set('ispl_name', values.ispl_name);
				record.set('wndw_modl_idcd', values.wndw_modl_idcd);
				record.set('wdgr_idcd', values.wdgr_idcd);
				record.set('modl_name', values.modl_name);
				record.set('invc_qntt', values.invc_qntt);
				record.set('wdtp_name', values.wdtp_name);
				record.set('wdbf_itid', values.wdbf_itid);
				record.set('wdsf_itid', values.wdsf_itid);
				record.set('item_widh', values.item_widh);
				record.set('item_hght', values.item_hght);
				record.set('item_widh_1fst', values.item_widh_1fst);
				record.set('item_hght_1fst', values.item_hght_1fst);
				record.set('inwp_itid', values.inwp_itid);
				record.set('otwp_itid', values.otwp_itid);
				record.set('ings_tick', values.ings_tick);
				record.set('otgs_tick', values.otgs_tick);
				record.set('wdbf_incl_yorn', values.wdbf_incl_yorn);
				record.set('wdsf_incl_yorn', values.wdsf_incl_yorn);
				record.set('vent_plac_dvcd', vent_plac_dvcd);
				record.set('rpst_wryp_name', values.rpst_wryp_name);
				record.set('bycv_incl_yorn', values.bycv_incl_yorn);
				record.set('bfrn_incl_yorn', values.bfrn_incl_yorn);
				record.set('moss_incl_yorn', values.moss_incl_yorn);
				record.set('moss_itid', values.moss_itid);
				record.set('hndl_hght', values.hndl_hght);
				record.set('remk_text', values.remk_text);
				record.set('glss_amnt_incl_yorn', values.glss_amnt_incl_yorn);
				record.set('wdbf_auto_cutt_yorn', values.wdbf_auto_cutt_yorn);
				record.set('wdbf_auto_weld_yorn', values.wdbf_auto_weld_yorn);
				record.set('wdsf_auto_cutt_yorn', values.wdsf_auto_cutt_yorn);
				record.set('wdsf_auto_weld_yorn', values.wdsf_auto_weld_yorn);
				record.set('wdsf_rate_name', values.wdsf_rate_name);
//				record.set('ings_itid', values.ings_itid);
//				record.set('otgs_itid', values.otgs_itid);
//				record.set('ings_fixd_itid', values.ings_fixd_itid);
//				record.set('otgs_fixd_itid', values.otgs_fixd_itid);
//				record.set('inhd_left_itid', values.inhd_left_itid);
//				record.set('inhd_righ_itid', values.inhd_righ_itid);
//				record.set('othd_left_itid', values.othd_left_itid);
//				record.set('othd_righ_itid', values.othd_righ_itid);
//				record.set('clee_innr', values.clee_innr);
//				record.set('clee_otsd', values.clee_otsd);
//				record.set('efcn_grad_dvcd', values.efcn_grad_dvcd);
//				record.set('mult_hole_yorn', values.mult_hole_yorn);
			}
		}else{
			var seq = uper_seqn + 1;
			var dsp = uper_seqn + 1;
			record = Ext.create( store.model.modelName , {
				line_seqn		: seq,
				brnd_bacd		: values.brnd_bacd,			//브랜드코드
				base_name		: values.base_name,			//브랜드명
				wdgr_idcd		: values.wdgr_idcd,			//창호그룹ID
				wdtp_idcd		: values.wdtp_idcd,			//창호형태ID
				wndw_modl_idcd	: values.wndw_modl_idcd,	//창호모델ID
				modl_name		: values.modl_name,			//모델명
				invc_qntt		: values.invc_qntt,			//수량
				ispl_name		: values.ispl_name,			//설치위치
				wdbf_itid		: values.wdbf_itid,			//BF품목ID
				wdsf_itid		: values.wdsf_itid,			//SF품목ID
				item_widh		: values.item_widh,			//길이
				item_hght		: values.item_hght,			//높이
				item_widh_1fst	: values.item_widh_1fst,	//길이1
				item_hght_1fst	: values.item_hght_1fst,	//높이1
				inwp_itid		: values.inwp_itid,			//내부랩핑품목ID
				otwp_itid		: values.otwp_itid,			//외부랩핑품목ID
				ings_tick		: values.ings_tick,			//내부유리두께
				otgs_tick		: values.otgs_tick,			//외부유리두께
				vent_plac_dvcd	: vent_plac_dvcd,			//vent위치구분코드
				rpst_wryp_name	: values.rpst_wryp_name,	//대표래핑명
				bfrn_incl_yorn	: values.bfrn_incl_yorn,	//bf보강재포함여부
				wdbf_incl_yorn	: values.wdbf_incl_yorn,	//창틀포함여부
				wdsf_incl_yorn	: values.wdsf_incl_yorn,	//창짝포함여부
				moss_incl_yorn	: values.moss_incl_yorn,	//방충망포함여부
				moss_itid		: values.moss_itid,			//방충망품목ID
				hndl_hght		: values.hndl_hght,			//핸들높이
				remk_text		: values.remk_text,			//비고
				wdsf_rate_name	: values.wdsf_rate_name,	//창형태 = 창짝비율명
				glss_amnt_incl_yorn	: values.glss_amnt_incl_yorn,	//유리금액포함여부
				wdbf_auto_cutt_yorn	: values.wdbf_auto_cutt_yorn,	//BF자동절단여부
				wdbf_auto_weld_yorn	: values.wdbf_auto_weld_yorn,	//BF자동용접여부
				wdsf_auto_cutt_yorn	: values.wdsf_auto_cutt_yorn,	//SF자동절단여부
				wdsf_auto_weld_yorn	: values.wdsf_auto_weld_yorn,	//SF자동용접여부
//				ings_itid		: values.ings_itid,			//내부유리품목ID
//				otgs_itid		: values.otgs_itid,			//외부유리품목ID
//				ings_fixd_itid	: values.ings_fixd_itid,	//내부유리FIX품목ID
//				otgs_fixd_itid	: values.otgs_fixd_itid,	//외부유리FIX품목ID
//				inhd_left_itid	: values.inhd_left_itid,	//내부핸들좌측품목ID
//				inhd_righ_itid	: values.inhd_righ_itid,	//내부핸들우측품목ID
//				othd_left_itid	: values.othd_left_itid,	//외부핸들좌측품목ID
//				othd_righ_itid	: values.othd_righ_itid,	//외부핸들우측품목ID
//				clee_innr		: values.clee_innr,			//크리내측
//				clee_otsd		: values.clee_otsd,			//크리외측
//				efcn_grad_dvcd	: values.efcn_grad_dvcd,	//효율등급구분코드
//				mult_hole_yorn	: values.mult_hole_yorn,	//배수홀여부
			});
			store.add(record);
		}
		me.setResponse(record);
	}

});

