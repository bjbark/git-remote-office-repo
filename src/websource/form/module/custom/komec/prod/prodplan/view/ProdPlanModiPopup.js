Ext.define('module.custom.komec.prod.prodplan.view.ProdPlanModiPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-prodplanmodi-popup',

	title		: '생산지시 수정',
	closable	: true,
	autoShow	: true,
	width		: 450 ,
	height		: 330,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

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
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var datetime = new Date();
		console.log(datetime);
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			margin	: '15 0 0 0',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'vbox',
					border	: 0,
					margin	: '13 0 0 0',
					items	: [
					    {	xtype	: 'panel',
					    	layout	: 'hbox',
					    	border 	: 0,
					    	items	: [
					    	    {	fieldLabel	: '지시번호',
									name		: 'invc_numb',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 200,
									labelWidth	: 65,
							    },{	fieldLabel	: '수주번호',
									name		: 'acpt_numb',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 200,
									labelWidth	: 75,
							    }
					    	]
					    },{	xtype	: 'panel',
					    	layout	: 'hbox',
					    	border 	: 0,
					    	items	: [
					    	    {	fieldLabel	: '품목코드',
									name		: 'item_idcd',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 200,
									labelWidth	: 65,
							    },{	fieldLabel	: '당초 지시수량',
									name		: 'orig_indn_qntt',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 200,
									labelWidth	: 75,
							    }
					    	]
					    },{	xtype	: 'panel',
					    	layout	: 'hbox',
					    	border	: 0,
					    	items	: [
					    	    {	fieldLabel	: '품명',
									name		: 'item_name',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 400,
									labelWidth	: 65,
					    		}
					    	]

					    },{	xtype	: 'panel',
					    	layout	: 'hbox',
					    	border 	: 0,
					    	items	: [
					    	    {	fieldLabel	: '규격',
									name		: 'item_spec',
									xtype		: 'textfield',
									fieldCls	: 'readOnlyfield',
									readOnly	: true,
									width		: 400,
									labelWidth	: 65,
							    }
					    	]
					    /* ----------------- 입력란 ----------------- */
					    },{	fieldLabel	: Language.get('item','담당자'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'drtr_name',
							pair		: 'drtr_idcd',
							width		: 195,
							labelWidth	: 65,
							clearable	: true,
							margin		: '20 0 5 0',
							popup: {
								select : 'SINGLE',
								widget : 'lookup-user-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd:'제품' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{	xtype	: 'textfield',
							name	: 'drtr_idcd',
							hidden	:true
						},{	name : 'wkfw_idcd', xtype : 'textfield' , hidden : true
						},{	xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							items	: [
								{	fieldLabel	: Language.get('inqy_term','생산일정'),
									xtype		: 'datetimefield',
									name		: 'strt_dttm',
									width		: 195,
									labelWidth	: 65,
									hourText	: 'H',
									minuteText	: 'M',
									todayText	: '오늘',
									format		: 'Y-m-d H:i',
									submitFormat: 'YmdHi',
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
								},{	text		: '~',
									xtype		: 'label',
									width		: 15,
									style		: 'text-align:center'
								},{	xtype		: 'datetimefield',
									name		: 'endd_dttm',
									width		: 120,
									hourText	: 'H',
									minuteText	: 'M',
									todayText	: '오늘',
									format		: 'Y-m-d H:i',
									submitFormat: 'YmdHi',
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
								}
							]
						},{	xtype	: 'panel',
							layout	: 'hbox',
							margin	: '5 0 0 0',
							border	: 0,
							items	: [
								{	fieldLabel	: '지시수량',
									name		: 'indn_qntt',
									xtype		: 'numericfield',
									labelWidth	: 65,
									width		: 195,
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
								}
							]
						},{	fieldLabel	: 'Lot No',
							name		: 'lott_numb',
							xtype		: 'textfield',
							margin		: '5 0 0 0',
							labelWidth	: 65,
							width		: 400,
						},{	xtype		: 'textfield', name	: 'pror_numb'		, hidden	: true
						},{	xtype		: 'textfield', name	: 'bzpl_idcd'		, hidden	: true
						},{	xtype		: 'textfield', name	: 'amnd_degr'		, hidden	: true
						},{	xtype		: 'textfield', name	: 'line_seqn'		, hidden	: true
						},{	xtype		: 'textfield', name	: 'cstm_idcd'		, hidden	: true
						},{	xtype		: 'textfield', name	: 'item_idcd'		, hidden	: true
						},{	xtype		: 'textfield', name	: 'updt_idcd'		, hidden	: true , value:_global.login_pk
						},{	xtype		: 'textfield', name	: 'crte_idcd'		, hidden	: true , value:_global.login_pk
						},{	xtype		: 'textfield', name	: 'prog_stat_dvcd'	, hidden	: true
						}
					]
				},
			]
		};
		return form;
	},

	/**
	 * 확인 버튼 이벤트
	 */

	finishAction: function(){
		var me		= this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			master4	= Ext.ComponentQuery.query('module-prodplan-lister-master4')[0]
		;
		if(baseform.isValid()){
			/*if((me.params._set =="insert" && values.indn_qntt > values.pror_remn_qntt ) || values.indn_qntt <= 0){
				Ext.Msg.alert('알림','지시수량을 확인해주세요.');
				return;
			}*/
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			Ext.merge(values,{pror_numb : me.params.invc_numb});
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/komec/prod/prodplan/modify/pror.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({records:[values]})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					master4.getStore().reload();
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
					//master4.getStore().reload();
				}
			});
		}
	}
});
