Ext.define('module.qc.project.remkwork.view.RemkWorkPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-remkwork-popup',

	title		: Language.get('prjt_prod','작업지시'),
	name		: 'prjt_prod',
	closable	: true,
	autoShow	: true,
	width		: 395 ,
	height		: 420,
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
					margin	: '20 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('indn_date','지시일자'),
							xtype		: 'datefield',
							name		: 'invc_date',
							itemId		: 'invc_date',
							labelWidth	: 70,
							width		: 345,
							allowBlank	: false	,
							fieldCls	: 'requiredindex',
							value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
							emptyText	: Const.invalid.emptyValue,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						},{	name	: 'line_seqn', xtype : 'numericfield' , hidden : true ,itemId	: 'line_seqn'
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('sttm1','시작일시'),
							xtype		: 'datefield',
							name		: 'sttm1',
							itemId		: 'sttm1',
							width		: 200,
							labelWidth	: 70,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						},{	fieldLabel	: Language.get('','~'),
							xtype		: 'timefield',
							name		: 'sttm2',
							itemId		: 'sttm2',
							width		: 145,
							labelWidth	: 20,
							format		: 'H:i',
							submitFormat: 'Hi'+'00',
							anchor		: '100%',
							value		: '00:00',
							margin : '0 0 0 0'
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: '종료일시',
							xtype		: 'datefield',
							name		: 'edtm1',
							itemId		: 'edtm1',
							width		: 200,
							labelWidth	: 70,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							listeners	: {
								blur: function() {
									var panel = this.up('form'),
										sttm1 = panel.down('[name=sttm1]').getValue();
										time = Number(sttm1)-Number(this.getValue());
									if(time > 0){
										Ext.Msg.alert("알림","종료일시를 다시 입력해주십시오.");
										this.setValue().clear();
									}
								}
							}
						},{	fieldLabel	: '~',
							xtype		: 'timefield',
							name		: 'edtm2',
							itemId		: 'edtm2',
							format		: 'H:i',
							submitFormat: 'Hi'+'00',
							anchor		: '100%',
							value		: '00:00',
							width		: 145,
							labelWidth	: 20,
							listeners	: {
								blur: function() {
									var panel = this.up('form'),
										sttm1 = panel.down('[name=sttm1]').getValue();
										edtm = panel.down('[name=edtm1]').getValue();
									if(sttm1-edtm==0 && time > 0){
										Ext.Msg.alert("알림","종료일시를 다시 입력해주십시오.");
										this.setValue().clear();
									}
								}
							}
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('scrt_yorn','외주여부'),
							xtype		: 'lookupfield',
							name		: 'scrt_yorn',
							itemId		: 'scrt_yorn',
							lookupValue	: resource.lookup('yorn'),
							width		: 345,
							labelWidth	: 70,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('cvic_idcd','설비명'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								width		: 345,
								labelWidth	: 70,
								name		: 'cvic_name',
								pair		: 'cvic_idcd',
								itemId		: 'cvic_idcd',
								popup: {
									select	: 'SINGLE',
									widget	: 'lookup-cvic-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										var panel1 = nameField.up('form');
										var layout = ('[name=prjt_prod]');
										panel1.down('[name=wkct_idcd]').setValue(records[0].get('wkct_idcd'));
										nameField.setValue(records[0].get('cvic_name'));
										pairField.setValue(records[0].get('cvic_idcd'));
									}
								}
							},{ name : 'cvic_idcd', xtype : 'textfield' , hidden : true
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('rsps_idcd','작업자'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'user_name',
							pair		: 'rsps_idcd',
							clearable	: false ,
							width		: 345,
							labelWidth	: 70,
							itemId		: 'rsps_idcd',
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
						},{	name	: 'rsps_idcd'		, xtype : 'textfield' , hidden : true
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('work_cont','작업내용'),
							xtype		: 'textarea',
							name		: 'work_cont',
							itemId		: 'work_cont',
							width		: 345,
							height		: 110,
							labelWidth	: 70,
						}
					]
				},{	name	: 'pjod_idcd'		, xtype : 'textfield' , hidden : true , itemId	: 'pjod_idcd',
				},{	name	: 'item_name'		, xtype : 'textfield' , hidden : true , itemId	: 'item_name',
				},{	name	: 'item_spec'		, xtype : 'textfield' , hidden : true , itemId	: 'item_spec',
				},{	name	: 'modl_name'		, xtype : 'textfield' , hidden : true , itemId	: 'modl_name',
				},{	name	: 'work_schd_dvcd'	, xtype : 'textfield' , hidden : true , itemId	: 'work_schd_dvcd',
				},{	name	: 'idcd'			, xtype : 'textfield' , hidden : true , itemId	: 'idcd',
				},{	name	: 'indn_qntt'		, xtype : 'textfield' , hidden : true
				},{	name	: 'id'				, xtype : 'textfield' , hidden : true
				},{ name	: 'wkct_idcd'		, xtype : 'textfield' , hidden : true
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
			set		= null,
			check	= 0,
			lister	= Ext.ComponentQuery.query('module-remkwork-lister-detail')[0],
			select	= lister.getSelectionModel().getSelection()[0],
			max		= 1
		;

		var a = Ext.ComponentQuery.query('#invc_date')[0].getValue(); //지시일자

		if(a== null || a==''){
			Ext.Msg.show({ title: '알림', msg: '지시일자가 반드시 있어야합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/qc/project/remkwork/get/work.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
						pjod_idcd		: values.pjod_idcd
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
					max = result.records[0].max;
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		})
		Ext.Ajax.request({
			url		: _global.location.http() + '/qc/project/remkwork/set/work.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
						records :[{
						pjod_idcd		: values.pjod_idcd,
						invc_date		: values.invc_date,
						line_seqn		: max+1,
						sttm1			: values.sttm1,
						sttm2			: values.sttm2,
						edtm1			: values.edtm1,
						edtm2			: values.edtm2,
						ansr_yorn		: values.ansr_yorn,
						scrt_yorn		: values.scrt_yorn,
						cvic_idcd		: values.cvic_idcd,
						rsps_idcd		: values.rsps_idcd,
						wkct_idcd		: values.wkct_idcd,
						work_cont		: values.work_cont,
						item_name		: values.item_name,
						item_spec		: values.item_spec,
						modl_name		: values.modl_name,
						poor_seqn		: select.data.poor_seqn,
						pjod_idcd		: select.data.pjod_idcd
						}]
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
					me.setResponse( {success : true ,  values : baseform , values :values });
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
