Ext.define('module.cust.cstmvist.view.CstmVistPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-cstmvist-popup',

	title		: '방문정보',
	closable	: true,
	autoShow	: true,
	width		: 644 ,
	height		: 637,
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
		var me	= this,
			form =
				{	xtype		: 'form-panel',
					dock		: 'left',
					bodyStyle	: { padding: '5px' },
					width		: 632,
					fieldDefaults: { width : 400, labelWidth : 100, labelSeparator : '' },
					items		: [
						{	name	: 'cstm_idcd',value : this.params.cstm_idcd, xtype : 'textfield' , hidden : true
						},{	fieldLabel	:  Language.get( 'cstm_name' , '거래처명'),
							xtype		: 'popupfield',
							maxLength	: 200,
							allowBlank	: false,
							name		: 'cstm_name',
							pair		: 'cstm_idcd',
							clearable	: true ,
							width		: 210,
							value		: this.params.cstm_name,
							hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV' ? true : false,
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-cstm-popup',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							}
						},{	fieldLabel	:  Language.get( 'cstm_name' , '거래처명'),
							name		: 'cstm_name',
							xtype		: 'textfield',
							maxLength	: 200,
							allowBlank	: false,
							onwerEditing: true,
							readOnly	: true,
							value		: this.params.cstm_name,
							hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV' ? false : true,
						},{	fieldLabel	: Language.get('vist_date','방문일자'),
							xtype		: 'datefield',
							name		: 'vist_date',
							itemId		: 'vist_date',
							width		: 210,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: this.params.vist_date
//							value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
						},{	fieldLabel	: '방문사원',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'vist_empy_name',
							pair		: 'vist_empy_idcd',
							itemId		: 'vist_empy_idcd',
							clearable	: false ,
							width		: 210,
							value		: _global.login_id,
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-user-popup',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{	name		: 'vist_empy_idcd',value : this.params.vist_empy_idcd, xtype : 'textfield' , hidden : true,
						},{	fieldLabel	: '방문목적',
							name		: 'vist_purp_dvcd',
							xtype		: 'lookupfield',
							lookupValue	: resource.lookup('vist_purp_dvcd'),
							readOnly	: false,
							value		: this.params.vist_purp_dvcd
						},{	fieldLabel	: '방문상태',
							name		: 'vist_stat_dvcd',
							xtype		: 'lookupfield',
							lookupValue	: resource.lookup('vist_stat_dvcd'),
							readOnly	: false,
							value		: this.params.vist_stat_dvcd
						},{	name		: 'invc_numb',value		: this.params.invc_numb, xtype : 'textfield' , hidden : true
						},{
							xtype	: 'form-panel',
							margin	: '5 0 0 -5',
							region	: 'center',
							title	: '방문기록',
							width	: 632,
							fieldDefaults	: { width : 620, height :408, labelSeparator : '' },
								items	:[
								{	xtype	: 'htmleditor',
									name	: 'vist_recd',
									itemId		: 'vist_recd',
									allowBlank	: false,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									value		: this.params.vist_recd,
								},{	name	: '_set',value : this.params._set, xtype : 'textfield' , hidden : true
								},{	name	: 'invc_numb',value : this.params.invc_numb, xtype : 'textfield' , hidden : true
								}
							]
						}
					]
				}
		return form;
	},

	//확인
	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-cstmvist-lister-list')[0],
			store	= Ext.ComponentQuery.query('module-cstmvist-lister-master')[0].getStore(),
			store2	= Ext.ComponentQuery.query('module-cstmvist-lister-detail')[0].getStore(),
			form= this.params.invc_numb
		;

		if(values.cstm_idcd==''||values.cstm_idcd==null){
			Ext.Msg.alert("알림","거래처를 반드시 입력해주십시오.");
			return;
		}

		if(values.vist_date==''||values.vist_date==null){
			Ext.Msg.alert("알림","방문일자를 반드시 선택해주십시오.");
			return;
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/cust/cstmvist/set/detail.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					invc_numb		: form,
					cstm_idcd		: values.cstm_idcd,
					vist_date		: values.vist_date,
					vist_empy_idcd	: values.vist_empy_idcd,
					vist_purp_dvcd	: values.vist_purp_dvcd,
					vist_recd		: values.vist_recd,
					vist_stat_dvcd	: values.vist_stat_dvcd,
					dwup_empy_idcd	: _global.login_id,
//					line_seqn		: values.line_seqn,
					_set			: values._set,
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				master.getStore().reload();
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					store2.reload();
					me.setResponse( {success : true ,  values : baseform , values :form });
					me.close;
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	}
});
