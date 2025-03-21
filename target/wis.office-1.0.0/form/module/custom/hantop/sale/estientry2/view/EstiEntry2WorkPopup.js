Ext.define('module.custom.hantop.sale.estientry2.view.EstiEntry2WorkPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-estientry2-work-popup',

	title		: '작업일자 선택',
	closable	: true,
	autoShow	: true,
	width		: 260 ,
	height		: 180,
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
			itemId	: 'invc',
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 240,
							fieldDefaults: { width : 100, labelWidth : 70, labelSeparator : '' },
							items		: [
								{	fieldLabel	: '지시일자',
									xtype		: 'datefield',
									name		: 'work_date',
									width		: 180,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: new Date(),
									margin		: '0 0 10 0'
								},{	fieldLabel	: '작업일자',
									xtype		: 'datefield',
									name		: 'plan_date',
									width		: 180,
									margin		: '0 0 10 0',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								},{	fieldLabel	: Language.get('invc_numb','수주번호'),
									xtype		: 'textfield',
									name		: 'invc_numb',
									itemId		: 'invc_numb',
									labelWidth	: 80,
									width		: 150,
									hidden		: true
								},{	fieldLabel	: Language.get('lott_numb','Lot번호'),
									xtype		: 'textfield',
									name		: 'lott_numb',
									width		: 240,
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
	 * 확인 버튼 이벤트
	 */

	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			master	= Ext.ComponentQuery.query('module-estientry2-lister-master')[0],
			store	= Ext.getStore('module.custom.hantop.sale.estientry2.store.EstiEntry2WorkPopup'),
			record	= master.getSelectionModel().getSelection(),
			select	= master.getSelectionModel().getSelection()[0],
			param	=''
		;

//		if(values.pdod_date==''||values.pdod_date==null){
//			Ext.Msg.alert("알림","지시일자를 반드시 입력해주십시오.");
//		}else
		if(values.plan_date==''||values.plan_date==null){
			Ext.Msg.alert("알림","작업일자를 반드시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			for (var i = 0; i < record.length; i++) {
				record[i].set('work_date', values.work_date);
				record[i].set('plan_date', values.plan_date);
				record[i].set('lott_numb', values.lott_numb);
				store.add(record[i].data);
			}
			store.sync({
				success : function(operation){ },			// 저장 성공시
				failure : function(operation){ results.feedback({success : false }); },							// 저장 실패시 호출
				callback: function(operation){
					master.getStore().reload();
					mask.hide();
					me.hide();
				}											// 성공 실패 관계 없이 호출된다.
			});

		}
	}
});
