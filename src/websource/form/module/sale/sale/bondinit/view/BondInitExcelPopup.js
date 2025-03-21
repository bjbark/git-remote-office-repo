Ext.define('module.sale.sale.bondinit.view.BondInitExcepPopup', { extend: 'Axt.popup.Upload',
	alias	: 'widget.module-bondinit-excel-popup'			,

	title	: '거래처별 이월금액 업로드',

	closable: true,
	autoShow: true,
	width	: 380,
	height	: 160,
	layout	: {
		type: 'border'
	},

	waitMsg : Const.INSERT.mask,

	defaultFocus : 'initfocused',

	/**
	* component 초기화
	*/
	initComponent: function(config){
		var me = this;
		if (!me.popup.values){ me.popup.values ={}; }
		if (!me.popup.option){ me.popup.option ={}; }
		me.items = [me.createForm()];
		me.callParent(arguments);
	},

	listeners:{
		show:function(){
			if(!this.popup.params.invc_numb){
				Ext.Msg.alert('알림','항목을 선택하여주세요.');
				this.hide();
			}
		},
	},
	createForm: function(){
		var me = this, form =
		{
			xtype		: 'form-panel',
			region		: 'center',
			border		:  false,
			dockedItems	:
			[
				{
					xtype	: 'toolbar',
					dock	: 'bottom',
					items	:
					[
						Ext.isEmpty(me.popup.sample) ? {} : me.popup.sample , '->' ,
						{xtype : 'button' , text : '<span style="color:white">업로드</span>' , iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype : 'button' , text : '<span style="color:white">닫 기</span>'  , iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style'}
					]
				}
			],
			items : [ me.editorForm() ]
		};
		return form;
	},



	/**
	 * form 생성
	 */
	editorForm: function(){
		var me = this;
		var form =
		{
			xtype	:'form-panel' ,
			region	:'center',
			layout	: 'border',
			border	: false,
			layout	: { type: 'vbox', /*align: 'stretch'*/} ,
			items	: [
				{
					xtype			: 'form-panel',
					name			: 'uploadForm',
					region			: 'center',
					standardSubmit	:  false,
					border			:  false,
					url				:  'system/sale/sale/bondinit/set/excel.do',
					timeout			: 120000,
					method			: 'POST',
					layout			: { type: 'vbox', align: 'stretch' } ,
					padding			: 10 ,
					margin			: 0,
					renderTo		: Ext.getBody(),
					items			:
					[
						{
							xtype	: 'label',
							text	: '업로드할 파일을 선택 하여 주시기 바랍니다.' ,
							margin	: '0 0 5 0'
						},{	xtype		: 'filefield',
							name		: 'files',
							fieldLabel	: '첨부파일',
							allowBlank	: false,
							anchor		: '100%',
							width		: 300,
							buttonText	: '선택',
							regex       : new RegExp('\.(xlsx)', 'i'), // 확장자 제한 정규식
							listeners	: {
								render	: function(field) {
									field.fileInputEl.set({
										multiple : false
									});
								}
							}
						},{xtype:'hiddenfield', name:'param', value:''
						},{xtype:'hiddenfield', name:'token', value:_global.token_id
						},{
							xtype	: 'panel',
							layout	: 'hbox',
							border	: 0,
							items	: [
								{	xtype		: 'form-panel',
									border		: 0,
									//fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
									items		: [
										{	fieldLabel	: Language.get('invc_date', '이월년월' ),
											name		: 'invc_date',
											itemId		: 'invc_date',
											xtype		: 'monthfield',
											width		: 175,
											submitFormat: 'Ym',
											format		: 'Y-m',
											value		: new Date(new Date().getFullYear(),new Date().getMonth()),
											fieldCls	: 'requiredindex',
											editable	: false,
											clearble	: true
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
	 *
	 * 이미지 업로드 팝업에서 확인버튼 (서버에 이미지 전송)
	 */
	finishAction : function (button) {
		var me		= this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			param	= {},
			lister	= Ext.ComponentQuery.query('module-bondinit-lister')[0]
		;

		var a = Ext.ComponentQuery.query('#invc_date')[0].getValue();

		if	(a== null || a==''){
			Ext.Msg.show({ title: '알림', msg: '이월년월은 반드시 선택해주셔야합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		}

		// submit할 form가져오기
		var uploadForm = me.down('[name=uploadForm]');
		if(!uploadForm.isValid()) {
			Ext.Msg.alert(Const.NOTICE, '<span style="color:black">Upload</span> 파일 형식(.xlsx)을 확인해 주십시오.');
			return;
		}

		var invc_date = me.down('[name=invc_date]').getValue();
		var s = Ext.Date.format( invc_date , 'Ym');
		var invc_date = s;

		//개발자정의 파라미터 삽입
		console.log(invc_date);
		param.invc_date = invc_date;

		Ext.merge(param, me.params);
		// 파라미터 삽입
		uploadForm.getForm().setValues({
			param : JSON.stringify(param)
		});

		// submit
		uploadForm.getForm().submit({
			waitMsg:me.waitMsg, // progressbar 띄우기
			success:function(form, action){
				Ext.Msg.alert("알림", "엑셀 업로드가 완료 되었습니다.");
				lister.getStore().reload();
				me.close();
			},
			failure: function(form, action) {
				Ext.Msg.alert( '알림', action.result.message );
				me.close();
			}
		});
	}
});