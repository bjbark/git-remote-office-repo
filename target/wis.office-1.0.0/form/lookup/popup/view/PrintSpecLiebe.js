Ext.define('lookup.popup.view.PrintSpecLiebe', { extend: 'Ext.Panel',
	alias		: 'widget.lookup-printspec-liebe',
	store		: 'lookup.popup.store.PrintSpecLiebe',
	layout		: 'border',
	flex		: 1,
	border		: 0,
	initComponent: function () {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
	},
	columnItem:function(){
		var me = this,
			url = 'system/custom/iypkg/item/productmast/set/fileUpload.do',	// 업로드주소
			item = {
				xtype		: 'panel',
				layout		: 'border',
				flex		: 1,
				region		: 'center',
				border		: 0,
				items		: [
					{	xtype	: 'panel',						//TODO west
						region	: 'west',
						border	: 0,
						layout	: 'border',
						flex	: 1,
						items	: [
							{	xtype	: 'panel',
								region	: 'center',
								layout	: 'border',
								border	: 0,
								flex	: 1,
								items	: [
									{	xtype	: 'panel',
										region	: 'center',
										flex	: 1,
										items	: [
											{	xtype	: 'image',
												name	: 'left1',
												src		: "",
												flex	: 1,
												style	: 'width:100%',
												alt		: '이미지가 없습니다.',
												listeners:{
													render:function(field){
														setTimeout(function(){
															field.setHeight(field.up('panel').getSize().height)
														},200);
														if(field.src == ""){
															field.setSrc('unknown');
														}
													},
												}
											}
										],
										listeners:{
											el:{
												click:function(){
													var	form		= me.down('[itemId=left1]')
													;
													form.fileInputEl.dom.click();
												}
//												click:function(){
//													var	form		= me.down('[itemId=leftImage]'),
//														orgn_dvcd	= me.down('[name=orgn_dvcd]').getValue(),
//														invc_numb	= me.down('[name=invc_numb]').getValue()
//													;
//													form.fileInputEl.dom.click();
//													var param={};
//													param.orgn_dvcd			= orgn_dvcd,
//													param.stor_grp			= _global.stor_grp;
//													param.stor_id			= _global.stor_id;
//													param.hqof_idcd			= _global.hq_id;
//													param.invc_numb			= invc_numb;
//													param.line_seqn			= 0;
//													param.assi_seqn			= 1;
//													param.file_dvcd_1fst	= '2200';
//													var uploadForm = me.down('[name=uploadImage1]');
//													uploadForm.getForm().setValues({
//														param : JSON.stringify(param)
//													});
//												}
											}
										}
									}
								]
							}
						]
					},{	xtype	: 'panel',						//TODO west
						region	: 'center',
						border	: 0,
						layout	: 'border',
						flex	: 1,
						items	: [
							{	xtype	: 'panel',
								region	: 'center',
								layout	: 'border',
								border	: 0,
								flex	: 1,
								items	: [
									{	xtype	: 'panel',
										region	: 'center',
										flex	: 1,
										items	: [
											{	xtype	: 'image',
												name	: 'right1',
												src		: "",
												flex	: 1,
												style	: 'width:100%',
												alt		: '이미지가 없습니다.',
												listeners:{
													render:function(field){
														setTimeout(function(){
															field.setHeight(field.up('panel').getSize().height)
														},200);
														if(field.src == ""){
															field.setSrc('unknown');
														}
													},
												}
											}
										],
										listeners:{
											el:{
												click:function(){
													var	form		= me.down('[itemId=right1]'),
														orgn_dvcd	= me.down('[name=orgn_dvcd]').getValue(),
														invc_numb	= me.down('[name=invc_numb]').getValue()
													;
													form.fileInputEl.dom.click();
													var param={};
													param.orgn_dvcd			= orgn_dvcd,
													param.stor_grp			= _global.stor_grp;
													param.stor_id			= _global.stor_id;
													param.hqof_idcd			= _global.hq_id;
													param.invc_numb			= invc_numb;
													param.line_seqn			= 0;
													param.assi_seqn			= 1;
													param.file_dvcd_1fst	= '2200';
													var uploadForm = me.down('[name=uploadImage2]');
													uploadForm.getForm().setValues({
														param : JSON.stringify(param)
													});
												}
											}
										}
									}
								]
							}
						]
					},{	xtype	: 'panel',					//TODO east
						region	: 'east',
						layout	: 'border',
						border	: 0,
						flex	: 1,
						items	: [
							{	xtype	: 'panel',
								region	: 'center',
								layout	: 'border',
								border	: 0,
								flex	: 1,
								items	: [
									{	xtype	: 'panel',
										region	: 'east',
										flex	: 1,
										items	: [
											{	fieldLabel	: '',
												name		: 'user_memo',
												xtype		: 'textarea',
												emptyText	: '메모사항을 적어주십시오',
												height		: 405,
											}
										],
									}
								]
							}
						]
					},{	xtype	: 'panel',					//TODO form
						layout	: 'border',
						border	: 0,
						hidden	: true,
						items	: [
							{	xtype	: 'form-panel',
								name	: 'ownerForm',
								items	:[
									{	xtype	: 'form-panel',
										name	: 'uploadImage1',
										region	: 'center',
										standardSubmit: false,
										border	:  false,
										url		: url,
										timeout	: 120000,
										method	: 'POST',
										layout		: { type: 'vbox', align: 'stretch' } ,
										padding	: 10 ,
										layout		: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
										items		:[
											{	xtype			: 'filefield',
												name			: 'files',
												itemId			: 'left1',
												buttonOnly		: true,
												buttonText		: '',
												regex			: new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
												listeners		: {
													change		: function (field) {
														var file = field.fileInputEl.dom.files[0],
															reader = new FileReader(),
															imgtag = me.down('[name=left1]')
														;
														if (file) {
															reader.addEventListener('load', function (event) {
																me.down('[name=imge_chk1]').setValue('Y');
																imgtag.setSrc(event.target.result)
															});
															reader.readAsDataURL(file);
														}
													},
												}
											},{xtype:'hiddenfield', name:'param', value:''
											},{xtype:'hiddenfield', name:'token', value:_global.token_id }
										]
									},{	xtype	: 'form-panel',
										name	: 'uploadImage2',
										region	: 'center',
										standardSubmit: false,
										border	:  false,
										url		: url,
										timeout	: 120000,
										method	: 'POST',
										layout		: { type: 'vbox', align: 'stretch' } ,
										padding	: 10 ,
										layout		: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
										items		:[
											{	xtype			: 'filefield',
												name			: 'files',
												itemId			: 'right1',
												buttonOnly		: true,
												buttonText		: '',
												regex			: new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
												listeners		: {
													change		: function (field) {
														var file = field.fileInputEl.dom.files[0],
															reader = new FileReader(),
															imgtag = me.down('[name=right1]')
														;
														if (file) {
															reader.addEventListener('load', function (event) {
																me.down('[name=imge_chk2]').setValue('Y');
																imgtag.setSrc(event.target.result)
															});
															reader.readAsDataURL(file);
														}
													},
												},
											},{xtype:'hiddenfield', name:'param', value:''
											},{xtype:'hiddenfield', name:'token', value:_global.token_id }
										]
									}
								]
							}
						]
					},{	xtype		: 'hiddenfield',
						name		: 'invc_numb',
						listeners	:{
							change	: function(field,val){
								if(val!=''){
									setTimeout(function(){
										Ext.Ajax.request({
											url		: _global.location.http() + '/upload/get/imagesearch.do',
											params	: {
												token : _global.token_id,
												param : JSON.stringify({
													stor_id		: _global.stor_id,
													invc_numb	: val,
													orgn_dvcd	: 'product_mast',
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
													if(result.records.length > 0){
														var record = result.records,
															Img_format = "\\.(bmp|gif|jpg|jpeg|png)$"
														;
														for (var i = 0; i < record.length; i++) {
															var url = result.records[i].file_path;
															if(new RegExp(Img_format).test(url)){
																switch(result.records[i].file_dvcd_2snd){
																	case '1100' : me.down('[name=left1]').setSrc(_global.img_http+url);break;
																	case '2100' : me.down('[name=right1]').setSrc(_global.img_http+url);break;
																}
															}
														}
													}
												}
											},
											failure : function(result, request) {
											},
											callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
											}
										});
									},100);
								}
							}
						}
					},{	xtype	: 'hiddenfield',
						name	: 'orgn_dvcd'
					},{	xtype	: 'hiddenfield',
						name	: 'imge_chk1',
					},{	xtype	: 'hiddenfield',
						name	: 'imge_chk2',
					}
				]
			}
		;
		return item;
	},
	clearField:function(){
		var me = this,
			url = 'unknown'
		;

		me.down('[name=left1]').setSrc(url);
		me.down('[name=right1]').setSrc(url);

		for (var i = 0; i < 2; i++) {
			var hiddenField = me.down('[name=imge_chk' + i + ']');
			if (hiddenField) {
				hiddenField.setValue('N');
			}
		}
//		me.down('[name=invc_numb]').setValue('');
//		me.down('[name=orgn_dvcd]').setValue('');
		me.down('[name=ownerForm]').getForm().reset();
	},
	update:function(){
		var me			= this,
			orgn_dvcd	= me.down('[name=orgn_dvcd]').getValue(),
			invc_numb	= me.down('[name=invc_numb]').getValue(),
			uploadForm
		;
		for (var i = 0; i < 2; i++) {
			var hiddenField = me.down('[name=imge_chk' + i + ']');
			if(hiddenField){
				var	value	= hiddenField.getValue();
				uploadForm	= me.down('[name=uploadImage'+i+']');
				var	file_dvcd_2snd = '';
				var file_dvcd_1fst = '';

				switch(i){
					case 0: file_dvcd_2snd='', file_dvcd_1fst='3100';
						break;
					case 1: file_dvcd_2snd='1100',file_dvcd_1fst='';
						break;
					case 2: file_dvcd_2snd='1200',file_dvcd_1fst='';
						break;
					case 3: file_dvcd_2snd='2100',file_dvcd_1fst='';
						break;
					case 4: file_dvcd_2snd='2200',file_dvcd_1fst='';
						break;
					case 5: file_dvcd_2snd='3100',file_dvcd_1fst='';
						break;
					case 6: file_dvcd_2snd='3200',file_dvcd_1fst='';
						break;
					case 7: file_dvcd_2snd='4100',file_dvcd_1fst='';
						break;
					case 8: file_dvcd_2snd='4200',file_dvcd_1fst='';
						break;
				}

				if(value == 'Y'){
					var param={};
					param.orgn_dvcd			= orgn_dvcd,
					param.stor_grp			= _global.stor_grp;
					param.stor_id			= _global.stor_id;
					param.hqof_idcd			= _global.hq_id;
					param.invc_numb			= invc_numb;
					param.line_seqn			= 0;
					param.assi_seqn			= i;
					param.file_dvcd_1fst	= file_dvcd_1fst;
					param.file_dvcd_2snd	= file_dvcd_2snd;
					param.imge_chk			= value;
					Ext.merge(param, this.params);
					uploadForm.getForm().setValues({
						param : JSON.stringify(param)
					});
					uploadForm.getForm().submit({
						waitMsg:this.waitMsg, // progressbar 띄우기
						success:function(form, action){
						},
						failure: function(form, action) {
							Ext.Msg.alert( '', '이미지 업로드 실패 했습니다.' );
						}
					});
				}
			}
		}
//			var	value			= me.down('[name=imge_chk'+i+']').getValue();
//			var	uploadForm		= me.down('[name=uploadImage'+i+']');
//			var	file_dvcd_2snd = '';
//			var file_dvcd_1fst = '';

//			switch(i){
//				case 0: file_dvcd_2snd='', file_dvcd_1fst='3100';
//					break;
//				case 1: file_dvcd_2snd='1100',file_dvcd_1fst='';
//					break;
//				case 2: file_dvcd_2snd='1200',file_dvcd_1fst='';
//					break;
//				case 3: file_dvcd_2snd='2100',file_dvcd_1fst='';
//					break;
//				case 4: file_dvcd_2snd='2200',file_dvcd_1fst='';
//					break;
//				case 5: file_dvcd_2snd='3100',file_dvcd_1fst='';
//					break;
//				case 6: file_dvcd_2snd='3200',file_dvcd_1fst='';
//					break;
//				case 7: file_dvcd_2snd='4100',file_dvcd_1fst='';
//					break;
//				case 8: file_dvcd_2snd='4200',file_dvcd_1fst='';
//					break;
//			}

//			if(value == 'Y'){
//				var param={};
//				param.orgn_dvcd			= orgn_dvcd,
//				param.stor_grp			= _global.stor_grp;
//				param.stor_id			= _global.stor_id;
//				param.hqof_idcd			= _global.hq_id;
//				param.invc_numb			= invc_numb;
//				param.line_seqn			= 0;
//				param.assi_seqn			= i;
//				param.file_dvcd_1fst	= file_dvcd_1fst;
//				param.file_dvcd_2snd	= file_dvcd_2snd;
//				Ext.merge(param, this.params);
//				uploadForm.getForm().setValues({
//					param : JSON.stringify(param)
//				});
//				uploadForm.getForm().submit({
//					waitMsg:this.waitMsg, // progressbar 띄우기
//					success:function(form, action){
//					},
//					failure: function(form, action) {
//						Ext.Msg.alert( '', '이미지 업로드 실패 했습니다.' );
//					}
//				});
//
//			}
//		}
	}
});
