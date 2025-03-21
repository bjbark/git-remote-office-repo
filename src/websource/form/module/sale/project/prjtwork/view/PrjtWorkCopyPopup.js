Ext.define('module.sale.project.prjtwork.view.PrjtWorkCopyPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-prjtwork-popup',

	title		: Language.get('','유사금형 복사'),
//	name		: 'prjt_prod',
	closable	: true,
	autoShow	: true,
	width		: 210 ,
	height		: 350,
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
					margin	: '20 0 0 10',
					items	: [
						{	fieldLabel	: Language.get('deli_date','납기일자'),
							xtype		: 'datefield',
							name		: 'deli_date',
							itemId		: 'deli_date',
							width		: 165,
							allowBlank	: false	,
							fieldCls	: 'requiredindex',
							value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
							emptyText	: Const.invalid.emptyValue,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 10',
					items	: [
						{	fieldLabel	: Language.get('dsig_work_1','설계 대일정'),
							xtype		: 'checkbox',
							name		: 'dsig_work_1',
							itemId		: 'dsig_work_1',
							width		: 200,
							labelWidth	: 70,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 10',
					items	: [
						{	fieldLabel	: Language.get('dsig_work_2','설계 세부일정'),
							xtype		: 'checkbox',
							name		: 'dsig_work_2',
							itemId		: 'dsig_work_2',
							width		: 100,
							labelWidth	: 70,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 10',
					items	: [
						{	fieldLabel	: Language.get('work_date_1','작업대일정'),
							xtype		: 'checkbox',
							name		: 'work_date_1',
							itemId		: 'work_date_1',
							width		: 345,
							labelWidth	: 70,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 10',
					items	: [
						{	fieldLabel	: Language.get('work_date_2','작업상세일정'),
								xtype		: 'checkbox',
								width		: 345,
								labelWidth	: 70,
								name		: 'work_date_2',
								itemId		: 'work_date_2',
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 10',
					items	: [
						{	fieldLabel	: Language.get('apnd_file','첨부파일'),
							xtype		: 'checkbox',
							name		: 'apnd_file',
							itemId		: 'apnd_file',
							width		: 345,
							labelWidth	: 70,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 10',
					items	: [
						{	fieldLabel	: Language.get('colt_date','수금일정'),
							xtype		: 'checkbox',
							name		: 'colt_date',
							itemId		: 'colt_date',
							width		: 345,
							labelWidth	: 70,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 10',
					items	: [
						{	fieldLabel	: Language.get('bom','BOM'),
							xtype		: 'checkbox',
							name		: 'bom',
							width		: 345,
							labelWidth	: 70,
							itemId		: 'bom',
						}
					]
				},{	name	: 'pjod_idcd'		, xtype : 'textfield' , hidden : true , itemId	: 'pjod_idcd',
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
			lister	= Ext.ComponentQuery.query('module-prjtwork-lister-master')[0],
			select	= lister.getSelectionModel().getSelection()[0],
			records
		;

		var a = Ext.ComponentQuery.query('#deli_date')[0].getValue(); //지시일자

		if(a== null || a==''){
			Ext.Msg.show({ title: '알림', msg: '납기일자가 반드시 있어야합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		}

		records = JSON.stringify({
			invc_numb		: values.pjod_idcd,
			deli_date		: values.deli_date,
			dsig_work_1		: values.dsig_work_1,
			dsig_work_2		: values.dsig_work_2,
			work_date_1		: values.work_date_1,
			work_date_2		: values.work_date_2,
			apnd_file		: values.apnd_file,
			colt_date		: values.colt_date,
			bom				: values.bom
		});

		Ext.Ajax.request({
			url		: _global.location.http() + '/sale/project/prjtwork/set/copy.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					params : records
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
				lister.getStore().reload();
			}
		});
	}
});
