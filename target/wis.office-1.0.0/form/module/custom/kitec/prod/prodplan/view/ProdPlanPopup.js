Ext.define('module.custom.kitec.prod.prodplan.view.ProdPlanPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-prodplan-popup',

	title		: '주조생산계획 추가',
	closable	: true,
	autoShow	: true,
	width		: 345 ,
	height		: 250,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);

		me.down('[name=invc_numb]').setValue(me.popup.params.invc_numb);

		if(me.popup.params.select){
			var select = me.popup.params.select;
			me.down('[name=invc_numb]').setValue(select.data.invc_numb);
			me.down('[name=pror_numb]').setValue(select.data.pror_numb);
			me.down('[name=cvic_idcd]').setValue(select.data.cvic_idcd);
			me.down('[name=cvic_name]').setValue(select.data.cvic_name);
			me.down('[name=item_idcd]').setValue(select.data.item_idcd);
			me.down('[name=item_name]').setValue(select.data.item_name);
			me.down('[name=invc_date1]').setValue(select.data.plan_sttm);
			me.down('[name=invc_date2]').setValue(select.data.plan_edtm);
			me.down('[name=plan_qntt]').setValue(select.data.plan_qntt);
			me.down('[name=plan_qntt_1fst]').setValue(select.data.plan_qntt_1fst);
			me.down('[name=prod_trst_dvcd]').setValue(select.data.prod_trst_dvcd);
		}
	},

	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype : 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me = this,
		item = {
			xtype			: 'form-panel',
			dock			: 'left',
			width			: 400,
			border			: 0,
			bodyStyle		: { padding: '5px' },
			fieldDefaults	: { width : 315, labelWidth : 70, labelSeparator : '' },
			items			: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '8 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('','일자'),
							xtype		: 'betweenfield',
							name		: 'invc_date1',
							pair		: 'invc_date2',
							root		: true,
							clearable	: true,
							width		: 170,
							value		: new Date(),
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							listeners	: {
								change : function(val){
									val.up().up().down('[name=invc_date2]').setMinValue(this.value)
								}
							}
						},{	fieldLabel	: Language.get('','~'),
							xtype		: 'betweenfield',
							name		: 'invc_date2',
							pair		: 'invc_date1',
							clearable	: true,
							width		: 113,
							labelWidth	: 13,
							value		: new Date(),
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						},{	fieldLabel	: Language.get('invc_numb','생산계획번호'),
							xtype		: 'textfield',
							name		: 'invc_numb',
							width		: 175,
							readOnly	: true,
							fieldCls	: 'requiredindex',
							hidden		: true
						},{	fieldLabel	: Language.get('pror_numb','지시번호'),
							xtype		: 'textfield',
							name		: 'pror_numb',
							width		: 175,
							readOnly	: true,
							fieldCls	: 'requiredindex',
							hidden		: true
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('cvic','호기'),
							xtype		: 'popupfield',
							name		: 'cvic_name',
							pair		: 'cvic_idcd',
							clearable	: true,
							width		: 283,
							popup		: {
								select : 'SINGLE',
								widget : 'lookup-wkctcvic-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0', wkct_idcd : 'WT003' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cvic_name'));
									pairField.setValue(records[0].get('cvic_idcd'));
								}
							}
						},{	xtype : 'textfield', name : 'cvic_idcd', hidden : true
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('prod_trst_dvcd','생산구분'),
							xtype		: 'lookupfield',
							lookupValue	: resource.lookup('prod_trst_dvcd'),
							name		: 'prod_trst_dvcd',
							width		: 283,
							clearable	: true,
							editable	: false,
							value		: '1000',
//							listeners	: {
//								change : function(a){
//									var me = this,
//										value = me.value
//									;
//									if(value == '1000'){
//										me.up().up().down('[name=item_name2]').hide();
//										me.up().up().down('[name=item_name]').show();
//									}else{
//										me.up().up().down('[name=item_name]').hide();
//										me.up().up().down('[name=item_name2]').show();
//									}
//									me.up().up().down('[name=item_name]').reset();
//									me.up().up().down('[name=item_idcd]').reset();
//									me.up().up().down('[name=item_name2]').reset();
//									me.up().up().down('[name=stok_qntt]').reset();
//									me.up().up().down('[name=unostt]').reset();
//								}
//							}
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('item','품목'),
							xtype		: 'popupfield',
							width		: 283,
							name		: 'item_name',
							pair		: 'item_idcd',
							clearable	: true ,
							hidden		: false,
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-item-popup',
								params	: { stor_grp : _global.stor_grp , row_sts : '0', repr_sent : '대표품목' },
								result	: function(records, nameField, pairField) {
									var idcd = records[0].get('item_idcd'),
										popup = Ext.ComponentQuery.query('module-prodplan-popup')[0]
									;
									nameField.setValue(records[0].get('item_name'));
									pairField.setValue(records[0].get('item_idcd'));
									popup.down('[name=item_name2]').setValue(records[0].get('item_name'));

									//재고수량
									Ext.Ajax.request({
										url			: _global.location.http() + '/custom/kitec/prod/prodplan/get/stok.do',
										params		: {
											token	: _global.token_id ,
											param	: JSON.stringify({
												stor_id		: _global.stor_id,
												item_idcd	: records[0].get('item_idcd')
											})
										},
										async	: false,
										method	: 'POST',
										success	: function(response, request) {
											var result = Ext.decode(response.responseText)
											;
											if(result.records[0]){
												popup.down('[name=stok_qntt]').setValue(result.records[0].qntt);
											}else{
												popup.down('[name=stok_qntt]').setValue('');
											}
										}
									});

									//수주잔량
									Ext.Ajax.request({
										url			: _global.location.http() + '/custom/kitec/prod/prodplan/get/unqntt.do',
										params		: {
											token	: _global.token_id ,
											param	: JSON.stringify({
												stor_id		: _global.stor_id,
												item_idcd	: idcd
											})
										},
										async	: false,
										method	: 'POST',
										success	: function(response, request) {
											var result = Ext.decode(response.responseText)
											;
											if(result.records[0]){
												popup.down('[name=unostt]').setValue(result.records[0].unostt);
											}else{
												popup.down('[name=unostt]').setValue('');
											}
										}
									});
								}
							},
							listeners	: {
								change : function(){
									var me = this;
									if(this.value == '' || this.value == null){
										me.up().up().down('[name=stok_qntt]').setValue('');
										me.up().up().down('[name=unostt]').setValue('');
									}
								}
							}
						},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: Language.get('','품목'),
							xtype		: 'textfield',
							name		: 'item_name2',
							width		: 283,
							hidden		: true,
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('stok_qntt','재고수량'),
							xtype		: 'numericfield',
							name		: 'stok_qntt',
							width		: 152,
							readOnly	: true,
							fieldCls	: 'requiredindex',
						},{	fieldLabel	: Language.get('unostt','수주잔량'),
							xtype		: 'numericfield',
							name		: 'unostt',
							labelWidth	: 50,
							width		: 132,
							readOnly	: true,
							fieldCls	: 'requiredindex',
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('plan_qntt','계획수량 (L)'),
							xtype		: 'numericfield',
							name		: 'plan_qntt',
							width		: 152,
							listeners	: {
								change : function(){
									var me = this;
									me.up().up().down('[name=plan_qntt_1fst]').setValue(this.value);
								}
							}
						},{	fieldLabel	: Language.get('plan_qntt_1fst','(R)'),
							xtype		: 'numericfield',
							name		: 'plan_qntt_1fst',
							labelWidth	: 50,
							width		: 132,
							listeners	: {
								change : function(){
									var me = this;
									me.up().up().down('[name=plan_qntt]').setValue(this.value);
								}
							}
						}
					]
				}
			]
		}
	;
	return item;
	},


	//확인
	finishAction: function(){
		var me = this,
			records = [],
			lister  = Ext.ComponentQuery.query('module-prodplan-lister')[0],
			lister2 = Ext.ComponentQuery.query('module-prodplan-lister2')[0],
			new_invc_numb, pror_invc_numb
		;
		if(me.down('[name=invc_date1]').getValue() > me.down('[name=invc_date2]').getValue()){
			Ext.Msg.alert("알림","일자를 다시 입력해주십시오.");
		}else if(me.down('[name=invc_date1]').getValue()=='' || me.down('[name=invc_date1]').getValue()== null){
			Ext.Msg.alert("알림","일자를 입력해주십시오.");
		}else if(me.down('[name=invc_date2]').getValue()=='' || me.down('[name=invc_date2]').getValue()== null){
			Ext.Msg.alert("알림","일자를 입력해주십시오.");
		}else if(me.down('[name=cvic_idcd]').getValue()==''||me.down('[name=cvic_idcd]').getValue()==null){
			Ext.Msg.alert("알림","설비를 반드시 선택해주십시오.");
		}else if(me.down('[name=prod_trst_dvcd]').getValue()==''||me.down('[name=prod_trst_dvcd]').getValue()==null){
			Ext.Msg.alert("알림","생산구분을 반드시 선택해주십시오.");
		}else if(me.down('[name=item_idcd]').getValue()==''||me.down('[name=item_idcd]').getValue()==null){
			Ext.Msg.alert("알림","품목을 반드시 입력해주십시오.");
		}else if(me.down('[name=plan_qntt]').getValue()==''||me.down('[name=plan_qntt]').getValue()==null){
			Ext.Msg.alert("알림","계획수량을 반드시 입력해주십시오.");
		}else if(me.down('[name=plan_qntt_1fst]').getValue()==''||me.down('[name=plan_qntt_1fst]').getValue()==null){
			Ext.Msg.alert("알림","계획수량을 반드시 입력해주십시오.");
		}else{
			if(me.down('[name=invc_numb]').getValue() == ''){
				resource.keygen({
					url		: _global. location.http () + '/listener/seq/maxid.do',
					object	: resource. keygen,
					params	: {
						token	: _global. token_id ,
						param	: JSON. stringify({
							stor_id	: _global.stor_id,
							table_nm: 'prod_plan'
						})
					 },
					async  : false,
					callback : function(keygen) {
						if (keygen.success) {
							new_invc_numb = keygen.records[0].seq;
						} else {
							Ext.Msg.alert("error", keygen.message  );
							return;
						}
					}
				});

				resource.keygen({
					url		: _global. location.http () + '/listener/seq/maxid.do',
					object	: resource. keygen,
					params	: {
						token	: _global. token_id ,
						param	: JSON. stringify({
							stor_id	: _global.stor_id,
							table_nm: 'pror_mast'
						})
					 },
					async  : false,
					callback : function(keygen) {
						if (keygen.success) {
							pror_invc_numb = keygen.records[0].seq;
						} else {
							Ext.Msg.alert("error", keygen.message  );
							return;
						}
					}
				});
			}else{
				new_invc_numb = me.down('[name=invc_numb]').getValue();
				pror_invc_numb = me.down('[name=pror_numb]').getValue();
			}

			var strt_date	= Ext.Date.format(me.down('[name=invc_date1]').getValue(),'Ymd');
			var endd_date	= Ext.Date.format(me.down('[name=invc_date2]').getValue(),'Ymd');

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });

			mask.show();
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/kitec/prod/prodplan/set/setProdPlan.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb		: new_invc_numb,
						pror_invc_numb	: pror_invc_numb,
						strt_date		: strt_date,
						endd_date		: endd_date,
						wkct_idcd		: 'WT003',				//주조 고정
						wkfw_idcd		: 'WFRCL0002',			//주조 라인 고정
						cvic_idcd		: me.down('[name=cvic_idcd]').getValue(),
						item_idcd		: me.down('[name=item_idcd]').getValue(),
						prod_trst_dvcd	: me.down('[name=prod_trst_dvcd]').getValue(),
						plan_qntt		: me.down('[name=plan_qntt]').getValue(),
						plan_qntt_1fst	: me.down('[name=plan_qntt_1fst]').getValue()
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
						lister.getStore().reload();
						lister2.getStore().reload();
						me.down('form').getForm().reset();
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){
					mask.hide();
				}
			});
			this.close();
		}
	},



});
