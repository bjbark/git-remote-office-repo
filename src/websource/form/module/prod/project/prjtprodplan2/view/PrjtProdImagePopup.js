Ext.define('module.prod.project.prjtprodplan2.view.PrjtProdImagePopup', { extend: 'Axt.popup.Upload',
	alias		: 'widget.module-prjtprodplan2-popup-image'			,
//	store		: 'module.prod.project.prjtprodplan2.store.PrjtProdImagePopup',

	title: '이미지 업로드',

	closable: true,
	autoShow: true,
	width: 810,
	height: 350,
	layout: {
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
			var me = this;
			Ext.Ajax.request({
				url		: _global.location.http() + '/prod/project/prjtprodplan2/get/getImage.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						pjod_idcd		: this.popup.params.pjod_idcd,
						work_schd_dvcd	: this.popup.params.work_schd_dvcd,
						work_ordr_dvcd	: this.popup.params.work_ordr_dvcd,
						ordr_degr		: this.popup.params.ordr_degr,
						id				: this.popup.params.id
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
					} else {
						if(result.records[0].imge_1fst){
							me.down('[name=imge_1fst]').setValue(result.records[0].imge_1fst);
						}
						if(result.records[0].imge_2snd){
							me.down('[name=imge_2snd]').setValue(result.records[0].imge_2snd);
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
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
						'->' ,
						{xtype : 'button' , text : '<span style="color:white">업로드</span>' , iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype : 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style'}
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
		var me = this,
		item = {
			name	: 'imge_info',
			xtype	: 'form-panel',
			dock	:'left',
			autoScroll:true,
			region	: 'center',
			fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '' },
			items	: [
				{	xtype 	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
							items		: [
								{	xtype	: 'form-panel',
									name	: 'uploadForm',
									region	: 'center',
									standardSubmit: false,
									border	:  false,
									url		: 'system/prod/project/prjtprodplan2/set/setImage.do',
									timeout	: 120000,
									method	: 'POST',
									layout	: { type: 'vbox', align: 'stretch' } ,
									padding	: 10 ,
									layout	: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
									items	: [
										{	xtype       : 'filefield',
											name        : 'files',
											fieldLabel  : '이미지1',
											msgTarget   : 'side',
											allowBlank  : true,
											clearable	: true ,
											anchor      : '100%',
											margin		: '0 3 0 0 ',
											width       : 350,
											buttonText  : '선택',
											regex       : new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
											listeners: {
												change: function (field) {
													var file = field.fileInputEl.dom.files[0],
														reader = new FileReader(),
														form = this.up('form').up('form').up('panel').up('form')
													;
													if (file) {
														reader.addEventListener('load', function (event) {
															form.down('[name=image]').setSrc(event.target.result)
															form.down('[name=imge_chek1]').setValue('Y');
//																Ext.get('prjt_work_imge').dom.src = event.target.result;
														});
														reader.readAsDataURL(file);
													}else{
														form.down('[name=imge_chek1]').setValue('');
														form.down('[name=image]').setSrc('')
													}
												}
											}
										},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle
										},{	xtype       : 'filefield',
											name        : 'files',
											fieldLabel  : '이미지2',
											msgTarget   : 'side',
											allowBlank  : true,
											clearable	: true ,
											anchor      : '100%',
											margin		: '0 3 0 0 ',
											width       : 350,
											buttonText  : '선택',
											regex       : new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
											listeners: {
												change: function (field) {
													var file = field.fileInputEl.dom.files[0],
														reader = new FileReader()
														form = this.up('form').up('form').up('panel').up('form')
													;
													if (file) {
														reader.addEventListener('load', function (event) {
															form.down('[name=image2]').setSrc(event.target.result);
															form.down('[name=imge_chek2]').setValue('Y');
														});
														reader.readAsDataURL(file);
													}else{
														form.down('[name=imge_chek2]').setValue('');
														form.down('[name=image2]').setSrc('');
													}
												}
											}
										},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle2
										},{xtype:'hiddenfield', name:'param', value:''
										},{xtype:'hiddenfield', name:'token', value:_global.token_id }
									]
								}
							]
						}
					]
				},{	xtype 	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					autoscroll : true,
					items : [
						{	xtype	: 'image',
							name	: 'image',
							src		: '',
							width	: 300,
							height	: 200,
							margin	: '20 55',
							hidden	: false
						},{	xtype	: 'image',
							name	: 'image2',
							src		: '',
							width	: 300,
							height	: 200,
							margin	: '20 55',
							hidden	: false
						},{xtype : 'textfield', name : 'imge_chek1', hidden:true
						},{xtype : 'textfield', name : 'imge_chek2', hidden:true
						}
					]
				},{	xtype		:'textfield',
					name		: 'imge_1fst',
					hidden		: true,
					listeners	: {
						change:function(val){
							if(val.getValue()){
								img = new Uint8Array(val.getValue().split(","));
								blob = new Blob([img],{type:'image/png'})
								url = URL.createObjectURL(blob);
								this.up('form').down('[name=image]').setSrc(url);
							}else{
								this.up('form').down('[name=image]').setSrc('');
							}
						}
					}
				},{	xtype		:'textfield',
					name		: 'imge_2snd',
					hidden		: true,
					listeners	: {
						change:function(val){
							if(val.getValue()){
								img = new Uint8Array(val.getValue().split(","));
								blob = new Blob([img],{type:'image/png'})
								url = URL.createObjectURL(blob);
								this.up('form').down('[name=image2]').setSrc(url);
							}else{
								this.up('form').down('[name=image2]').setSrc('');
							}
						}
					}
				}
			]
		}
		;
		return item;
	},
	//TODO 이미지 지우기 function
	imgCancle:function(){
		var form = this.up('[name=imge_info]');
		form.down('[name=image]').setSrc('');
		form.down('[name=imge_1fst]').setValue('');

		form.down('[name=files]').fileInputEl.dom.value = '';
	},
	imgCancle2:function(){
		var form = this.up('[name=imge_info]');
		form.down('[name=image2]').setSrc('');
		form.down('[name=imge_2snd]').setValue('');

		form.down('[name=files]').fileInputEl.dom.value = '';
	},

	/**
	 *
	 * 이미지 업로드 팝업에서 확인버튼 (서버에 이미지 전송)
	 */
	finishAction : function (button) {
		var me				= this;
		var param			= {},
			form			= me.down('[name=imge_info]'),
			pjod_idcd		= this.popup.params.pjod_idcd,												// 팝업창을 render할때 불러온 params 이전 lister에서 보내줘야함
			work_schd_dvcd	= this.popup.params.work_schd_dvcd,
			work_ordr_dvcd	= this.popup.params.work_ordr_dvcd,
			ordr_degr		= this.popup.params.ordr_degr,
			id				= this.popup.params.id,
			chek1			= form.down('[name=imge_chek1]').getValue()
			chek2			= form.down('[name=imge_chek2]').getValue()
			imge_1fst		= form.down('[name=image]').src,
			imge_2snd			= form.down('[name=image2]').src,
			chk1=0, chk2=0
		;
		if(imge_1fst){
			if(chek1 == "" || chek1 == undefined){
				chk1 = 3;
			}
			else{
				chk1 = 1;
			}
		}
		if(imge_2snd){
			if(chek2 == "" || chek2 == undefined){
				chk2=3;
			}else{
				chk2=1;
			}
		}
		param.pjod_idcd			= pjod_idcd;
		param.work_schd_dvcd	= work_schd_dvcd;
		param.work_ordr_dvcd	= work_ordr_dvcd;
		param.ordr_degr			= ordr_degr;
		param.id				= id;
		param.chk1				= chk1;
		param.chk2				= chk2;
		Ext.merge(param, me.params);

		// submit할 form가져오기
		var uploadForm = me.down('[name=uploadForm]');
		if(!uploadForm.isValid()) {
			Ext.Msg.alert(Const.NOTICE, '<span style="color:black">Upload</span> 파일을 확인해 주십시오.');
			return;
		}

		// 파라미터 삽입
		uploadForm.getForm().setValues({
			param : JSON.stringify(param)
		});

		// submit
		uploadForm.getForm().submit({
			waitMsg:me.waitMsg, // progressbar 띄우기
			success:function(fm, action){
				Ext.Msg.alert( '', '업로드 성공 했습니다.' );
				form.down('[name=image]').setSrc('');
				form.down('[name=imge_1fst]').setValue('');
				form.down('[name=files]').fileInputEl.dom.value = '';

				form.down('[name=image2]').setSrc('');
				form.down('[name=imge_2snd]').setValue('');
				form.down('[name=files]').fileInputEl.dom.value = '';
				me.close();
			},
			failure: function(fm, action) {
				Ext.Msg.alert( '', '업로드 실패 했습니다.' );
				me.close();
			}
		});
	}
});