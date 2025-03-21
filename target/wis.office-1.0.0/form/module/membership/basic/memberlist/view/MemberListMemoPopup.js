Ext.define('module.membership.basic.memberlist.view.MemberListMemoPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-memberlist-memo-popup',

	title		: '회원메모',
	closable	: true,
	autoShow	: true,
	width		: 600 ,
	height		: 600,
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
		form = {
			xtype	: 'form-panel',
			border	:  false,
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('mmbr_idcd','회원ID')	,
							xtype		: 'textfield',
							name		: 'mmbr_idcd',
							itemId		: 'mmbr_idcd',
							value		: this.params.mmbr_idcd,
							width		: 160,
							labelWidth	: 60,
							allowBlank	: false,
							margin		: '0 0 5 0',
							readOnly	: true,
							hidden		: true
						},{	fieldLabel	: Language.get('mmbr_code','회원코드')	,
							xtype		: 'textfield',
							name		: 'mmbr_code',
							itemId		: 'mmbr_code',
							value		: this.params.mmbr_code,
							width		: 160,
							labelWidth	: 60,
							allowBlank	: false,
							margin		: '0 0 5 0',
							readOnly	: true
						},{	fieldLabel	: Language.get('mmbr_code','회원명')	,
							xtype		: 'textfield',
							name		: 'mmbr_name',
							itemId		: 'mmbr_name',
							value		: this.params.mmbr_name,
							width		: 160,
							labelWidth	: 60,
							allowBlank	: false,
							margin		: '0 0 5 0',
							readOnly	: true
						},{	xtype		: 'lookupfield',
							name		: 'mmbr_stat_dvcd',
							width		: 75,
							editable	: false,
							margin		: '0 0 0 5',
							lookupValue	: resource.lookup('mmbr_stat_dvcd'),
							value		: this.params.mmbr_stat_dvcd,
							readOnly	: true
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '2 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('sbsd_ttle','담당코치')	,
							xtype		: 'textfield',
							name		: 'drtr_name',
							itemId		: 'drtr_name',
							value		: this.params.drtr_name,
							width		: 160,
							labelWidth	: 60,
							margin		: '0 0 5 0',
							readOnly	: true
						},{	fieldLabel	: Language.get('dwup_empy_name','작성사원'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'dwup_empy_name',
							itemId		: 'dwup_empy_name',
							pair		: 'dwup_empy_idcd',
							value		: this.params.dwup_empy_name,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							clearable	: false ,
							width		: 160,
							labelWidth	: 60,
							margin		: '0 0 5 0',
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-user-popup',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{	name	: 'dwup_empy_idcd', xtype : 'textfield' , hidden : true , value : this.params.dwup_empy_idcd
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '2 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('dwup_date','작성일자'),
							hidden		: true,
							xtype		: 'datefield',
							name		: 'dwup_date',
							width		: 215,
							labelWidth	: 90,
							value		: this.params.dwup_date,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							readOnly	: true
						},{	fieldLabel	: Language.get('dwup_time','작성시간'),
							hidden		: true,
							xtype		: 'datefield',
							name		: 'dwup_time',
							itemId		: 'dwup_time',
							width		: 215,
							labelWidth	: 60,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							readOnly	: true
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '2 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('scrt_yorn','보안'),
							xtype		: 'lookupfield',
							name		: 'scrt_yorn',
							value		: this.params.scrt_yorn,
							lookupValue	: resource.lookup('yorn'),
							width		: 160,
							labelWidth	: 60,
						},{	fieldLabel	: Language.get('memo_dvcd','메모구분'),
							xtype		: 'lookupfield',
							name		: 'memo_dvcd',
							value		: this.params.memo_dvcd,
							lookupValue	: resource.lookup('memo_dvcd'),
							width		: 160,
							labelWidth	: 60
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('ttle','제목') 		,
							name		: 'ttle',
							itemId		: 'ttle',
							xtype		: 'textarea',
							value		: this.params.ttle,
							emptyText	: '제목을 입력해 주십시오',
							width		: 395,
							labelWidth	: 60,
						}
					]
				},{
					xtype	: 'form-panel',
					margin	: '10 0 0 0',
					region	: 'center',
					title	: '메모내용',
					fieldDefaults	: { width : 550, height :300, labelSeparator : '' },
					items	:[
						{	xtype		: 'htmleditor',
							name		: 'memo_1fst',
							itemId		: 'memo_1fst',
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							value		: '',
							listeners:{
								render:function(field){
									var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
									var fileReader = new FileReader();
									var img = new Uint8Array(me.params.memo_1fst.split(",")),
										blob = new Blob([img],{type:'text/plain'})
									;
									mask.show();
									fileReader.readAsText(blob,"UTF-8");
									setTimeout(function(){
										field.setValue(fileReader.result);
										mask.hide();
									},50);
								}
							}
						},{	name	: '_set',value : this.params._set, xtype : 'textfield' , hidden : true
						},{	name	: 'invc_numb',value : this.params.invc_numb, xtype : 'textfield' , hidden : true
						}
					]
				}
			]
		};
		return form;
	},

	/**
	 * 확인 버튼 이벤트
	 */

	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			store	= Ext.ComponentQuery.query('module-memberlist-memolister')[0].getStore(),
			form= this.params.invc_numb,
			line_seqn = ''
		;
		Ext.Ajax.request({
			url		: _global.location.http() + '/membership/memberlist/get/lastSeq.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id		: _global.stor_id,
					hqof_idcd	: _global.hqof_idcd,
					table_name	: 'memo',
					mmbr_idcd	: values.mmbr_idcd
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
					if(result.records.length>0){
						line_seqn = result.records[0].line_seqn;
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		console.log('line_seqn : ',line_seqn);
		var a = Ext.ComponentQuery.query('#ttle')[0].getValue(); //제목
		var b = Ext.ComponentQuery.query('#dwup_empy_name')[0].getValue(); //작성사원

		if(a== null || a==''){
			Ext.Msg.show({ title: '알림', msg: '제목이 반드시 있어야합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
		}else{
			if(b== null || b==''){
				Ext.Msg.show({ title: '알림', msg: '작성사원을 반드시 입력하여야 합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			}else{
				Ext.Ajax.request({
					url		: _global.location.http() + '/membership/memberlist/set/memo.do',
						params	: {
						token	: _global.token_id,
						param	: JSON.stringify({
							invc_numb		: form,
							mmbr_idcd		: values.mmbr_idcd,
							line_seqn		: line_seqn,
							scrt_dvcd		: values.scrt_dvcd,
							memo_dvcd		: values.memo_dvcd,
							memo_dttm		: Ext.Date.format(new Date(),'Ymdhis'),
							dwup_empy_idcd	: values.dwup_empy_idcd,
							ttle			: values.ttle,
							memo_1fst		: values.memo_1fst,
							dwup_date		: Ext.Date.format(new Date(),'Ymd'),
							_set			: values._set,
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
									store.reload();
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
		}
	}
});