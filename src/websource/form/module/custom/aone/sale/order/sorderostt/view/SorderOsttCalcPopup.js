Ext.define('module.custom.aone.sale.order.sorderostt.view.SorderOsttCalcPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-sorderostt-calc-popup',

	title		: '수리비 산출',
	closable	: true,
	autoShow	: true,
	width		: 360 ,
	height		: 380 ,
	layout		: {
		type : 'border'
	},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm() ];
		me.callParent(arguments);
	},

	/**
	* 화면폼
	*/
	createForm: function() {
		var me   = this,
			form = {
				xtype		: 'form-panel',
				region		: 'center',
				border		: false,
				dockedItems	: [
						{	xtype : 'toolbar',
							dock  : 'bottom',
							items : [
								{ text : '<span class="write-button">추가</span>'   , handler : me.addCalc	, cls: 'button1-style'	} ,
								'->' ,
								{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
								{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
							]
						}
				],
				items		: [me.editorForm()],
		};
		return form;
	},

	editorForm : function () {
		var me   = this,
			form = {
					xtype		: 'form-panel',
					border		: false,
					layout		: { type: 'vbox', align: 'stretch' } ,
					items		: [
						{	xtype  : 'panel',
							border : 0,
							margin : '10 0 0 0',
							items  : [
								{	fieldLabel : Language.get('invc_numb','AoneCode'),
									xtype      : 'textfield',
									name       : 'invc_numb',
									width      : 300,
									labelWidth : 100,
									value      : me.params.invc_numb,
									fieldCls   : 'requiredindex',
									readOnly   : true
								},{	fieldLabel : Language.get('work_invc_numb','견적번호'),
									xtype      : 'textfield',
									name       : 'work_invc_numb',
									width      : 300,
									labelWidth : 100,
									value      : me.params.work_invc_numb,
									fieldCls   : 'requiredindex',
									readOnly   : true,
									hidden     : true,
								},{	fieldLabel : Language.get('amnd_degr','차수'),
									xtype      : 'textfield',
									name       : 'amnd_degr',
									value      : me.params.amnd_degr,
									fieldCls   : 'requiredindex',
									hidden     : true
								},{	fieldLabel : Language.get('cstm_idcd','거래처ID'),
									xtype      : 'textfield',
									name       : 'cstm_idcd',
									value      : me.params.cstm_idcd,
									hidden     : true,
								},{	fieldLabel : Language.get('cstm_name','거래처명'),
									xtype      : 'textfield',
									name       : 'cstm_name',
									value      : me.params.cstm_name,
									hidden     : true,
								},{	fieldLabel : Language.get('invc_date','입고일자'),
									xtype      : 'textfield',
									name       : 'invc_date',
									width      : 300,
									labelWidth : 100,
									value      : me.params.invc_date,
									fieldCls   : 'requiredindex',
									readOnly   : true,
									format     : Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								},{	fieldLabel : Language.get('item_name','규격'),
									xtype      : 'textfield',
									name       : 'item_name',
									width      : 300,
									labelWidth : 100,
									value      : me.params.item_name,
									fieldCls   : 'requiredindex',
									readOnly   : true
								},{	fieldLabel : Language.get('sral_numb','Serial No.'),
									xtype      : 'textfield',
									name       : 'sral_numb',
									width      : 300,
									labelWidth : 100,
									value      : me.params.sral_numb,
									fieldCls   : 'requiredindex',
									readOnly   : true
								},{	fieldLabel : Language.get('item_idcd','품목ID'),
									xtype      : 'textfield',
									name       : 'item_idcd',
									value      : me.params.item_idcd,
									hidden     : true,
								},{	fieldLabel : Language.get('prod_drtr_name', '엔지니어' ),
									name       : 'prod_drtr_name',
									value      : me.params.prod_drtr_name,
									pair       : 'prod_drtr_idcd',
									xtype      : 'popupfield',
									width      : 300,
									labelWidth : 100,
									readOnly   : true,
									editable   : true,
									enableKeyEvents : true,
									fieldCls   : 'requiredindex',
									popup      : {
										widget : 'lookup-user-popup',
										select : 'SINGLE',
										params : { stor_grp : _global.stor_grp, line_stat : '0' },
										result : function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
										}
									}
								},{	name       : 'prod_drtr_idcd', xtype	: 'textfield', value : me.params.prod_drtr_idcd , hidden : true
								},{	layout     : 'vbox',
									border     : 20,
									align      : 'stretch',
									bodyStyle  : { padding: '0', background: 'gray' },
									items      : [
										{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
											items : [
												{	fieldLabel : Language.get('need_time','작업시간'),
													xtype      : 'numericfield',
													name       : 'need_time',
													value      : me.params.need_time,
													format     : '#,##0',
													summaryType : 'sum',
													width      : 140,
													margin     : '5 0 0 0',
													labelWidth : 100,
													labelStyle : 'color:white',
													readOnly   : true,
													listeners:{
														change : function(self, value){
															me.calc();
														}
													}
												},{	fieldLabel : Language.get('pric_time','X 시급'),
													xtype      : 'lookupfield',
													name       : 'pric_time',
													width      : 110,
													margin     : '5 0 0 0',
													labelWidth : 40,
													lookupValue: [['40000','40000'],['50000','50000'],['60000','60000']],
													value      : '40000',
													format     : '#,##0',
													labelStyle : 'color:white',
													fieldCls   : 'requiredindex, color:white',
													enableKeyEvents : true,
													listeners:{
														change : function(self, value){
															me.calc();
														}
													}
												},{	fieldLabel : Language.get('','='),
													xtype      : 'numericfield',
													name       : 'psep_exps_amnt',
													width      : 90,
													margin     : '5 0 0 0',
													labelWidth : 10,
													value      : me.params.need_time * 40000,
													summaryType: 'sum',
													format     : '#,##0',
													labelStyle : 'color:white',
													fieldCls   : 'requiredindex',
												}
											]
										},{	xtype   : 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
											items   : [
												{   fieldLabel  : Language.get('prts_repa_amnt','부품비 총액'),
													xtype       : 'numericfield',
													name        : 'prts_repa_amnt',
													width       : 340,
													labelWidth  : 100,
													margin      : '5 0 0 0',
													value       : me.params.prts_repa_amnt,
													labelStyle  : 'color:white',
													fieldCls    : 'requiredindex',
													readOnly    : true,
													listeners:{
														change : function(self, value){
															me.calc();
														}
													}
												}
									]
								},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items : [
										{	fieldLabel  : Language.get('','공과 잡비(7%)'),
											xtype       : 'numericfield',
											name        : 'etcc_repa_amnt',
											width       : 340,
											labelWidth  : 100,
											value       : (((me.params.need_time * 40000)+ me.params.prts_repa_amnt)*7 )/100,
											fieldCls    : 'requiredindex',
											summaryType : 'sum',
											format      : '#,##0',
											labelStyle  : 'color:white',
											readOnly    : true,
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items : [
										{	fieldLabel  : Language.get('','기업이윤(15%)'),
											xtype       : 'numericfield',
											name        : 'entp_pfit_amnt',
											width       : 340,
											labelWidth  : 100,
											value       : (((me.params.need_time * 40000)+ me.params.prts_repa_amnt)*15 )/100,
											format      : '#,##0',
											labelStyle  : 'color:white',
											fieldCls    : 'requiredindex',
											readOnly    : true,
											enableKeyEvents : true,
										}
									]
								},{	fieldLabel  : Language.get('','총액'),
									xtype       : 'numericfield',
									name        : 'repa_exps_amnt',
									width       : 340,
									labelWidth  : 100,
									value       : (me.params.need_time * 40000)+me.params.prts_repa_amnt+(((me.params.need_time * 40000)
													+ me.params.prts_repa_amnt)*0.07)+(((me.params.need_time * 40000)+ me.params.prts_repa_amnt)*0.15),
									fieldCls    : 'requiredindex',
									summaryType : 'sum',
									format      : '#,##0',
									labelStyle  : 'color:white',
									readOnly    : true,
								},
							]
						}
					]
				}
			],
		};
		return form;
	},

		/**
		 * 확인 버튼 이벤트
		 */
		finishAction: function(){
			var me = this,
				baseform = me.down('form'),
				record   = baseform.getRecord(),
				values   = baseform.getValues()
			;

			if(values.invc_numb==''||values.invc_numb==null){
				Ext.Msg.alert("알림","주문 번호를 선택해 입력해주십시오.");
				return;
			};

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			Ext.Ajax.request({
				url     : _global.location.http() + '/custom/aone/sale/order/sorderostt/set/repairCalc.do',
				params  : {
					 token : _global.token_id,
					 param : JSON.stringify({
						invc_numb       : values.invc_numb,
						amnd_degr       : values.amnd_degr,
						work_invc_numb  : values.work_invc_numb,
						pric_time       : values.pric_time,
						psep_exps_amnt  : values.psep_exps_amnt,
						prts_repa_amnt  : values.prts_repa_amnt,
						etcc_repa_amnt  : values.etcc_repa_amnt,
						entp_pfit_amnt  : values.entp_pfit_amnt,
						repa_exps_amnt  : values.repa_exps_amnt,
						prod_drtr_name  : values.prod_drtr_name,
						prod_drtr_idcd  : values.prod_drtr_idcd,
					})
				},
				async   : false,
				method  : 'POST',
				success : function(response, request) {
					var result = Ext.decode(response.responseText);
					Ext.Msg.alert("알림", "수리비 산출 등록이 완료 되었습니다.");
					Ext.ComponentQuery.query('module-sorderostt-lister-master2')[0].getStore().reload();
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
						me.setResponse( {success : true , values :  values });
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					mask.hide();
				}
			});
		},
		addCalc:function(){
			var	me = this.ownerCt.ownerCt.ownerCt;
			resource.loadPopup({
				widget : 'module-sorderostt-popup',
				params : {
					work_invc_numb : me.popup.params.work_invc_numb,
					owner : me
				}
			});
		},
		calc : function(){
			var	panel          = this.down('form'),
				need_time      = panel.down('[name=need_time]').getValue(),
				pric_time      = panel.down('[name=pric_time]').getValue(),
				prts_repa_amnt = panel.down('[name=prts_repa_amnt]').getValue()
			;
			
			var psep_exps_amnt = Number(need_time) * pric_time;
			var prts_repa_amnt = prts_repa_amnt;
			var etcc_repa_amnt = ((psep_exps_amnt + prts_repa_amnt) *7 )/100 ;
			var entp_pfit_amnt = ((psep_exps_amnt + prts_repa_amnt)*15)/100 ;
			var repa_exps_amnt = psep_exps_amnt + prts_repa_amnt + etcc_repa_amnt + entp_pfit_amnt;

			panel.down('[name=psep_exps_amnt]').setValue(psep_exps_amnt);
			panel.down('[name=etcc_repa_amnt]').setValue(etcc_repa_amnt);
			panel.down('[name=entp_pfit_amnt]').setValue(entp_pfit_amnt);
			panel.down('[name=repa_exps_amnt]').setValue(repa_exps_amnt);
		}
	});
