Ext.define('module.custom.kitec.mtrl.po.purcisttwork1.view.PurcIsttWork1Popup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-purcisttwork1-popup',
	store		: 'module.custom.kitec.mtrl.po.purcisttwork1.store.PurcIsttWork1Bundle',


	title		: '번들팝업',
	closable	: true,
	autoShow	: true,
	width		: 410 ,
	height		: 500,
	layout		: {
		type : 'border'
	},

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			id			: 'form',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
					]
				}
			],
			items : [ me.editorForm(), me.createGrid() ]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  0,
			itemId	: 'invc',
			margin	: '5 0 0 6',
			height	: 247,
			layout	: { type: 'vbox',/* align: 'stretch' */} ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							width		: 386,
							fieldDefaults: { width : 300, labelWidth : 100, labelSeparator : '' },
							items		: [
							{	xtype	: 'panel',
								layout	: 'vbox',
								border	: 0,
								margin		: '10 10 10 0',
								items	: [
									{	fieldLabel	: Language.get('offr_numb','발주번호'),
										xtype		: 'popupfield',
										editable	: false,
										enableKeyEvents : true,
										clearable	: true,
										allowBlank	: false,
										fieldCls	: 'requiredindex',
										emptyText	: Const.invalid.emptyValue,
										name		: 'invc_numb',
										width		: 300,
										pair		: 'invc_numb1',
										listeners	: {
											change	: function(){
												var val = this.getValue();
												var popup	= Ext.ComponentQuery.query('module-purcisttwork1-popup')[0],
													store	= popup.down('grid').getStore()
												;
												if(val =='' || val == null){
													me.down('[name=prnt_idcd]').reset();
													me.down('[name=line_seqn]').reset();
													me.down('[name=item_name]').reset();
													me.down('[name=item_idcd]').reset();
													me.down('[name=item_code]').reset();
													me.down('[name=item_name]').reset();
													me.down('[name=item_spec]').reset();
													me.down('[name=unit_name]').reset();
													me.down('[name=cstm_idcd]').reset();
													me.down('[name=drtr_idcd]').reset();
													me.down('[name=unit_idcd]').reset();
													me.down('[name=stnd_unit]').reset();
													me.down('[name=modl_name]').reset();
													me.down('[name=offr_pric]').reset();
													me.down('[name=offr_vatx]').reset();
													me.down('[name=offr_qntt]').reset();
													me.down('[name=dlvy_qntt]').reset();
													me.down('[name=cstm_name]').reset();
													me.down('[name=istt_qntt_view]').reset();
													me.down('[name=qntt]').reset();
													me.down('[name=istt_offe_name]').reset();
													me.down('[name=istt_wrhs_idcd]').reset();
													me.down('[name=amnd_degr]').reset();
													if(store.data.length > 0 ){
														store.removeAll();
													}
												}
											}
										},
										popup: {
											select : 'SINGLE',
											widget : 'lookup-purcordr-popup-v2',
											params : { stor_grp : _global.stor_grp , line_stat : '0' , acct_bacd : '자재', ingot : 'on'},
											result : function(records, nameField, pairField) {
												var popup	= Ext.ComponentQuery.query('module-purcisttwork1-popup')[0],
													store	= popup.down('grid').getStore()
													lister	= Ext.ComponentQuery.query('module-purcisttwork1-lister') [0].getStore(),
													record	= undefined,
													total	= 0,
													not_dlvy_qntt = 0
												;
												nameField.setValue(records[0].get('invc_numb'));
												pairField.setValue(records[0].get('invc_numb'));
												me.down('[name=prnt_idcd]').setValue(records[0].get('invc_numb'));
												me.down('[name=line_seqn]').setValue(records[0].get('line_seqn'));
												me.down('[name=item_name]').setValue(records[0].get('item_name'));
												me.down('[name=item_idcd]').setValue(records[0].get('item_idcd'));
												me.down('[name=item_code]').setValue(records[0].get('item_code'));
												me.down('[name=item_name]').setValue(records[0].get('item_name'));
												me.down('[name=item_spec]').setValue(records[0].get('item_spec'));
												me.down('[name=unit_name]').setValue(records[0].get('unit_name'));
												me.down('[name=cstm_idcd]').setValue(records[0].get('cstm_idcd'));
												me.down('[name=drtr_idcd]').setValue(records[0].get('drtr_idcd'));
												me.down('[name=unit_idcd]').setValue(records[0].get('unit_idcd'));
												me.down('[name=stnd_unit]').setValue(records[0].get('stnd_unit'));
												me.down('[name=modl_name]').setValue(records[0].get('modl_name'));
												me.down('[name=offr_pric]').setValue(records[0].get('offr_pric'));
												me.down('[name=offr_vatx]').setValue(records[0].get('offr_vatx'));
												me.down('[name=offr_qntt]').setValue(records[0].get('offr_qntt'));
												me.down('[name=offr_amnt]').setValue(records[0].get('offr_amnt'));
												me.down('[name=dlvy_qntt]').setValue(records[0].get('dlvy_qntt'));
												me.down('[name=cstm_name]').setValue(records[0].get('cstm_name'));
												me.down('[name=ttsm_amnt]').setValue(records[0].get('ttsm_amnt'));
												me.down('[name=istt_qntt_view]').reset();
												me.down('[name=istt_wrhs_name]').setValue(records[0].get('istt_wrhs_name'));
												me.down('[name=istt_wrhs_idcd]').setValue(records[0].get('istt_wrhs_idcd'));
												me.down('[name=amnd_degr]').setValue(records[0].get('amnd_degr'));


												if(lister.data.length > 0){
													lister.each(function(record){
														invc_numb = record.get('invc_numb'); // 발주번호
														line_seqn = record.get('line_seqn'); // 순번
														pop_invc = popup.down('[name=invc_numb]').getValue();
														pop_seqn = popup.down('[name=line_seqn]').getValue();
														if(invc_numb != '' && pop_invc == invc_numb && pop_seqn == line_seqn ){
															// lister에 있는 입고수량 모두 더해서 뺀것을 세팅
															total +=  record.get('istt_qntt');
														}
													});
												}
												if(total > 0){
													not_dlvy_qntt = records[0].get('not_dlvy_qntt')-total;
												}else{
													not_dlvy_qntt = records[0].get('not_dlvy_qntt');
												}
												me.down('[name=qntt]').setValue(not_dlvy_qntt);

												store.removeAll();
												setTimeout(function(){
													popup.down('[name=bund_qntt]').focus(true , 10);
												},200);
											}
										}
									},{	name : 'invc_numb1', xtype : 'textfield' , hidden : true
									},{	name : 'line_seqn' , xtype : 'textfield' , hidden : true
									},{	name : 'prnt_idcd', xtype : 'textfield' , hidden : true
									},{	name : 'cstm_idcd' , xtype : 'textfield' , hidden : true
									},{	name : 'drtr_idcd' , xtype : 'textfield' , hidden : true
									},{	name : 'item_code' , xtype : 'textfield' , hidden : true
									},{	name : 'stnd_unit' , xtype : 'textfield' , hidden : true
									},{	name : 'unit_idcd' , xtype : 'textfield' , hidden : true
									},{	name : 'unit_name' , xtype : 'textfield' , hidden : true
									},{	name : 'modl_name' , xtype : 'textfield' , hidden : true
									},{	name : 'dlvy_qntt' , xtype : 'numericfield' , hidden : true
									},{	name : 'offr_pric' , xtype : 'numericfield' , hidden : true
									},{	name : 'offr_vatx' , xtype : 'numericfield' , hidden : true
									},{	name : 'offr_qntt' , xtype : 'numericfield' , hidden : true
									},{	name : 'offr_amnt' , xtype : 'numericfield' , hidden : true
									},{	name : 'istt_offe_name' , xtype : 'textfield' , hidden : true
									},{	name : 'amnd_degr' , xtype : 'textfield' , hidden : true
									},{	name : 'ttsm_amnt' , xtype : 'numericfield' , hidden : true
									},{	name : 'istt_wrhs_name' , xtype : 'textfield' , hidden : true
									},{	fieldLabel	: Language.get('','거래처'),
										xtype		: 'textfield',
										readOnly	: true,
										name		: 'cstm_name',
										width		: 300,
									},{	name : 'istt_wrhs_idcd', xtype : 'textfield' , hidden : true
									},{	fieldLabel	: Language.get('item_name','품목명'),
										xtype		: 'textfield',
										readOnly	: true,
										name		: 'item_name',
										width		: 300,
									},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
									},{ fieldLabel	: Language.get('item_spec','규격'),
										xtype		: 'textfield',
										name		: 'item_spec',
										width		: 300,
										readOnly	: true,
									},{ fieldLabel	: Language.get('istt_date','입고일자'),
										xtype		: 'datefield',
										name		: 'istt_date',
										width		: 300,
										allowBlank	: false,
										value		: new Date(),
										fieldCls	: 'requiredindex',
										emptyText	: Const.invalid.emptyValue,
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD
									},{ fieldLabel	: Language.get('upid_baln_qntt','미납잔량'),
										xtype		: 'numericfield',
										name		: 'qntt',
										width		: 300,
										readOnly	: true,
									},{ fieldLabel	: Language.get('istt_qntt','입고수량'),
										xtype		: 'numericfield',
										name		: 'istt_qntt_view',
										width		: 300,
										value		: 0,
										listeners	: {
										}
									},{	xtype	: 'panel',
										layout	: 'hbox',
										border	: 0,
										items	: [
											{ fieldLabel	: Language.get('','번들수'),
												xtype		: 'numericfield',
												name		: 'bund_qntt',
												width		: 180,
												itemId		: 'initfocused' ,
												value		: '1',
												enableKeyEvents : true,
												listeners	: {
													keydown : function(self, e) {
														if (e.keyCode == e.ENTER || e.keyCode == 9) {
															me.calculator();
														}
													}
												}
											},{ text	: Language.get('','계산'),
												xtype		: 'button',
												name		: 'calBtn',
												width		: 115,
												margin		: '0 0 0 5',
												handler		: me.calculator,
											},{ xtype: 'numericfield'	, name : 'total'	, hidden : true
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
		};
		return form;
	},

	/**
	 * 리스트
	 */
	createGrid: function(){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				region		: 'south',
				height		: 215,
				features	: [{ ftype : 'grid-summary' }],
				selModel	: { selType: 'cellmodel'},
				plugins		: { ptype  :'cellediting-directinput', clicksToEdit: 1 },
				columnLines : true,
				border		: false,
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				store		: Ext.create(me.store),
				paging		: {
					xtype	: 'grid-paging',
					items	: [
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style', itemId : 'close'}
					]
				},
				columns: [
					{	dataIndex: 'line_stat'	, text : Language.get('line_stat'	,'상태'		)	, width :  40	, align : 'center', xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat')
					},{ dataIndex: 'lott_numb'	, text : Language.get('lott_numb'	,'LOT번호'	)	, width : 150	, align : 'left', summaryType: 'count'
					},{ dataIndex: 'istt_qntt'	, text : Language.get('qntt'		,'수량'		)	, width : 100	, align : 'right', summaryType: 'sum',value	: 0, xtype : 'numericcolumn',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
							}
						},
					}
				],
				listeners: {
					edit: function(editor, context) {
						var me = this
						 	lister = me.getStore(),
							popup = Ext.ComponentQuery.query('module-purcisttwork1-popup')[0],
							istt_qntt_view = popup.down('[name=istt_qntt_view]').getValue(),
							selection = me.getSelectionModel().getSelection()[0],
							row = lister.indexOf(selection);
							findrecord = undefined,
							record = context.record,
							value = 0
						if(lister.data.length > 0){
							lister.each(function(findrecord) {
								if(findrecord.get('istt_qntt') < 0){
									record.set('istt_qntt',0)
								}
								if (findrecord.get('istt_qntt') > 0) {
									value += findrecord.get('istt_qntt');
								}
							});
							popup.down('[name=total]').setValue(value);
							if(value > istt_qntt_view){
								Ext.Msg.alert("알림", "수량의 총합은 입고수량과 일치해야합니다. 입력하신 입고수량이나 수량을 확인하여 주시기 바랍니다.");
								record.set('istt_qntt',0)
							}
						}
					},
				}
			}
		;
		return grid;
	},

	calculator : function() {
	var me = this,
		popup	= Ext.ComponentQuery.query('module-purcisttwork1-popup')[0],
		lister	= Ext.ComponentQuery.query('module-purcisttwork1-lister') [0].getStore(),
		store	= popup.down('grid').getStore(),
		record	= undefined,
		invc_numb,incr_lott
	;
		if(popup.down('[name=invc_numb]').getValue()== '' || popup.down('[name=invc_numb]').getValue() == null){
			Ext.Msg.alert("알림", "발주번호를 선택하여 주시기 바랍니다.");
			return;
		}
		if(popup.down('[name=istt_date]').getValue()== '' || popup.down('[name=istt_date]').getValue() == null){
			Ext.Msg.alert("알림", "입고일자를 선택하여 주시기 바랍니다.");
			return;
		}
		if(popup.down('[name=bund_qntt]').getValue() < 1){
			Ext.Msg.alert("알림", "번들수는 1이상의 정수를 입력하여 주시기 바랍니다.");
			return;
		}
		if(popup.down('[name=istt_qntt_view]').getValue() < popup.down('[name=bund_qntt]').getValue()){
			Ext.Msg.alert("알림", "번들수는 입고수량보다 적은 수만 입력해주시기 바랍니다.");
			return;
		}
		if(popup.down('[name=istt_qntt_view]').getValue() < 1){
			Ext.Msg.alert("알림", "입고수량은 1이상의 정수를 입력하여 주시기 바랍니다.");
			return;
		}
		else{
			var date = popup.down('[name=istt_date]').getValue();
			var yyyy = date.getFullYear().toString();
			var mm = (date.getMonth() + 1).toString();
			var dd = date.getDate().toString();
			date = yyyy + (mm[1] ? mm : '0'+mm[0]) + (dd[1] ? dd : '0'+dd[0]);

			var record= {
				invc_numb : popup.down('[name=invc_numb]').getValue(),
				line_seqn : popup.down('[name=line_seqn]').getValue(),
				istt_date : date,
				bund_qntt : popup.down('[name=bund_qntt]').getValue(),
				istt_qntt : popup.down('[name=istt_qntt_view]').getValue(),
			};
			store.load({
				params		: {
					token	: _global.token_id,
					param	:	JSON.stringify({
						param : record
					})
				},
				callback: function(operation){
					if(lister.data.length > 0){
						lister.each(function(record){
							cstm_idcd = record.get('cstm_idcd'); // lot번호
							pop_cstm = popup.down('[name=cstm_idcd]').getValue();
							if(cstm_idcd != '' && pop_cstm == cstm_idcd ){
								incr_lott= Number(record.data.lott_numb.substr(9,2));
							}
						});
						store.each(function(record){
							incr_lott = Number(incr_lott) + 1;
							if(incr_lott > 9){
								incr_lott = incr_lott;
							}else{
								incr_lott = '0'+incr_lott;
							}
							record.set('lott_numb',record.get('lott_numb').substr(0,9)+incr_lott);
						});
					}
				}
			});
			popup.down('[name=total]').setValue(popup.down('[name=istt_qntt_view]').getValue());
		}
	},

	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me		= this,
			panel	= me.down('grid'),
			popup	= Ext.ComponentQuery.query('module-purcisttwork1-popup')[0],
			lister	= Ext.ComponentQuery.query('module-purcisttwork1-lister')[0],
			baseform= popup.down('form'),
			store	= popup.down('grid').getStore(),
			listerStore = lister.getStore(),
			selects	= panel.getSelectionModel().getSelection(),
			request	= [],
			models	= store.getRange(),
			a=popup.down('[name=qntt]').getValue();
			b = 0,
			c = a-b,
			z = popup.down('[name=dlvy_qntt]').getValue(),
			p = popup.down('[name=offr_pric]').getValue(),
			total = popup.down('[name=total]').getValue(),
			qntt = 0, v = 0, amnt_total = 0, vatx_total = 0, not_istt_qntt = a, new_istt_qntt = 0, hap = 0,
			check = '0'
		;

		if(store.data.items.length <= 0){
			Ext.Msg.alert("알림","번들을 계산하여 주시기 바랍니다.");
			return;
		}
		if(total < popup.down('[name=istt_qntt_view]').getValue()){
			Ext.Msg.confirm("확인", "입력하신 수량의 총합이 입고수량보다 적습니다. 진행하시겠습니까?", function(button) {
				if (button == 'yes') {
					for(var i=0; i < store.data.length;i++ ){
						if(store.data.items[i].data.istt_qntt == 0){
							Ext.Msg.alert("알림","수량은 1이상의 정수를 입력하여 주시기바랍니다.");
							return;
						}else{
							b = store.data.items[i].data.istt_qntt;
						}
						new_istt_qntt = store.data.items[i].data.istt_qntt;
						qntt = models[i].get('istt_qntt');	//각 번들수량
						amnt = qntt*p;						//금액
						v = Math.floor(amnt/100)*10;		//부가세
						if(a>b){
							models[i].set('diff_qntt',a-b);
							models[i].set('new_dlvy_qntt',z+b);
							models[i].set('istt_amnt',amnt);
							models[i].set('istt_vatx',v);
							models[i].set('ttsm_amnt',amnt+v);
						}else if(a=b){
							models[i].set('diff_qntt',0);
							models[i].set('new_dlvy_qntt',z+b);
							models[i].set('istt_amnt',amnt);
							models[i].set('istt_vatx',v);
							models[i].set('ttsm_amnt',amnt+v);
						}
						models[i].set('istt_wrhs_idcd',popup.down('[name=istt_wrhs_idcd]').getValue());
						models[i].set('crte_idcd',_global.login_pk);
						models[i].set('updt_idcd',_global.login_pk);
						models[i].set('drtr_name',_global.login_nm);
						models[i].set('amnd_degr',popup.down('[name=amnd_degr]').getValue().trim());
						models[i].set('offr_qntt',popup.down('[name=offr_qntt]').getValue());
						models[i].set('prnt_idcd',popup.down('[name=prnt_idcd]').getValue());
						models[i].set('item_code',popup.down('[name=item_code]').getValue());
						models[i].set('item_idcd',popup.down('[name=item_idcd]').getValue());
						models[i].set('item_name',popup.down('[name=item_name]').getValue());
						models[i].set('item_spec',popup.down('[name=item_spec]').getValue());
						models[i].set('unit_name',popup.down('[name=unit_name]').getValue());
						models[i].set('unit_idcd',popup.down('[name=unit_idcd]').getValue());
						models[i].set('cstm_idcd',popup.down('[name=cstm_idcd]').getValue());
						models[i].set('stnd_unit',popup.down('[name=stnd_unit]').getValue());
						models[i].set('cstm_name',popup.down('[name=cstm_name]').getValue());
						models[i].set('modl_name',popup.down('[name=modl_name]').getValue());
						models[i].set('istt_wrhs_name',popup.down('[name=istt_wrhs_name]').getValue());
						models[i].set('istt_qntt',new_istt_qntt);
						not_istt_qntt = not_istt_qntt-qntt;
						models[i].set('new_istt_qntt', b); //납품수량
						models[i].set('qntt',not_istt_qntt);
						models[i].set('istt_pric',p);
						if(i == 0){
							models[i].set('firt_yorn','Y');
							models[i].set('istt_sum',b);
						}

						if(models[i].get('amnd_degr') == '' || models[i].get('amnd_degr') == null ) models[i].set('amnd_degr','0')

						hap += b;
						models[i].set('not_dlvy_qntt',popup.down('[name=qntt]').getValue()-hap); //미납잔량
						models[i].set('istt_amnt',Math.floor(new_istt_qntt*p));
						models[i].set('istt_vatx',((Math.floor(new_istt_qntt*p))*0.1));
						models[i].set('ttsm_amnt',((Math.floor(new_istt_qntt*p))*0.1)+Math.floor(new_istt_qntt*p));

					}
					for(var i=0;i<models.length;i++){
						listerStore.add(models[i]);
						popup.destroy();
					}
				};
			});
		}else{
			check = '1';
		}

		if(check == '1'){
			for(var i=0; i < store.data.length;i++ ){
				if(store.data.items[i].data.istt_qntt == 0){
					Ext.Msg.alert("알림","수량은 1이상의 정수를 입력하여 주시기바랍니다.");
					return;
				}else{
					b = store.data.items[i].data.istt_qntt;
				}
				new_istt_qntt = store.data.items[i].data.istt_qntt;
				qntt = models[i].get('istt_qntt');	//각 번들수량
				amnt = qntt*p;						//금액
				v = Math.floor(amnt/100)*10;		//부가세
				if(a>b){
					models[i].set('diff_qntt',a-b);
					models[i].set('new_dlvy_qntt',z+b);
					models[i].set('istt_amnt',amnt);
					models[i].set('istt_vatx',v);
					models[i].set('ttsm_amnt',amnt+v);
				}else if(a=b){
					models[i].set('diff_qntt',0);
					models[i].set('new_dlvy_qntt',z+b);
					models[i].set('istt_amnt',amnt);
					models[i].set('istt_vatx',v);
					models[i].set('ttsm_amnt',amnt+v);
				}
				models[i].set('istt_wrhs_idcd',popup.down('[name=istt_wrhs_idcd]').getValue());
				models[i].set('crte_idcd',_global.login_pk);
				models[i].set('updt_idcd',_global.login_pk);
				models[i].set('drtr_name',_global.login_nm);
				models[i].set('amnd_degr',popup.down('[name=amnd_degr]').getValue().trim());
				models[i].set('offr_qntt',popup.down('[name=offr_qntt]').getValue());
				models[i].set('prnt_idcd',popup.down('[name=prnt_idcd]').getValue());
				models[i].set('item_code',popup.down('[name=item_code]').getValue());
				models[i].set('item_idcd',popup.down('[name=item_idcd]').getValue());
				models[i].set('item_name',popup.down('[name=item_name]').getValue());
				models[i].set('item_spec',popup.down('[name=item_spec]').getValue());
				models[i].set('unit_name',popup.down('[name=unit_name]').getValue());
				models[i].set('unit_idcd',popup.down('[name=unit_idcd]').getValue());
				models[i].set('cstm_idcd',popup.down('[name=cstm_idcd]').getValue());
				models[i].set('stnd_unit',popup.down('[name=stnd_unit]').getValue());
				models[i].set('cstm_name',popup.down('[name=cstm_name]').getValue());
				models[i].set('modl_name',popup.down('[name=modl_name]').getValue());
				models[i].set('istt_wrhs_name',popup.down('[name=istt_wrhs_name]').getValue());
				models[i].set('istt_qntt',new_istt_qntt);
				not_istt_qntt = not_istt_qntt-qntt;
				models[i].set('new_istt_qntt', b); //납품수량
				models[i].set('qntt',not_istt_qntt);
				models[i].set('istt_pric',p);
				if(i == 0){
					models[i].set('firt_yorn','Y');
					models[i].set('istt_sum',b);
				}

				if(models[i].get('amnd_degr') == '' || models[i].get('amnd_degr') == null ) models[i].set('amnd_degr','0')

				hap += b;
				models[i].set('not_dlvy_qntt',popup.down('[name=qntt]').getValue()-hap); //미납잔량
				models[i].set('istt_amnt',Math.floor(new_istt_qntt*p));
				models[i].set('istt_vatx',((Math.floor(new_istt_qntt*p))*0.1));
				models[i].set('ttsm_amnt',((Math.floor(new_istt_qntt*p))*0.1)+Math.floor(new_istt_qntt*p));

			}
			for(var i=0;i<models.length;i++){
				listerStore.add(models[i]);
				popup.destroy();
			}
		}
	}
});
