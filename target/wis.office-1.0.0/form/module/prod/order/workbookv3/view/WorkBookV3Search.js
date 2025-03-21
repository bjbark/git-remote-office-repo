Ext.define('module.prod.order.workbookv3.view.WorkBookV3Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-workbookv3-search',

	/**
	 *.
	 */
	initComponent: function(){
		var me = this;
		var wkctLookup = new Array();

		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/order/workbookv3/get/wkctsearch.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					rslt_rept_yorn	: '1',
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
					for(var i =0; i<result.records.length;i++){
						wkctLookup.push([result.records[i].wkct_idcd,result.records[i].wkct_name]);
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});

		me.items =[ me.searchBasic(wkctLookup)];
		me.callParent();
	},
	searchBasic : function(wkctLookup){
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 65,
				margin	: '20 40 0 10',
				autoScroll: true,
				items	: [
					{	xtype: 'fieldset',
						layout: 'hbox',
						border	: 0,
						items: [
							{	fieldLabel	: '일자',
								xtype		: 'datefield',
								name		: 'work_date',
								width		: 300,
								maxWidth	: 500,
								value		: new Date(),
								labelWidth	: 70,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								readOnly	: true,
								height		: 45,
								labelCls	: 'textTemp '+_global.hq_id+'label',
								fieldCls	: 'textTemp '+_global.hq_id+'field',
								cls			: 'textTemp',
								style		: 'text-align:center',
							}
						]
					},{	fieldLabel	: Language.get('wkct_name', '공정'),
						labelCls	: 'textTemp '+_global.hq_id+'label',	// label에 클래스추가
						fieldCls	: 'textTemp '+_global.hq_id+'field',	// field에 클래스추가
						xtype		: 'lookupfield',
						name		: 'wkct_name',
						trigger1Cls : _global.hq_id+'trigger',				// trigger(버튼)에 클래스 추가
						width		: 300,
						multiSelect	: false ,
						editable	: false,
						lookupValue	: wkctLookup,
						height		: 45,
						maxWidth	: 500,
						labelWidth	: 60,
						value		: Ext.util.Cookies.get('wkct_idcd'),
						margin		: '0 40 0 0',
						listConfig	:{
							itemCls		: _global.hq_id+'item',				// lookup list에 클래스 추가
							minHeight	: 200
						},
						listeners : {
							render : function(feild) {
								var lister		= Ext.ComponentQuery.query('module-workbookv3-lister')[0],
									detail		= Ext.ComponentQuery.query('module-workbookv3-detail')[0],
									detail2		= Ext.ComponentQuery.query('module-workbookv3-detail2')[0],
									work_date	= Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd"),
									mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
									value		= feild.value
								;
								mask.show();

								lister.select({
									callback:function(records, operation, success) {
										if (success) {
											lister.getSelectionModel().select(0);
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge({ wkct_idcd : value,
												stor_id   : _global.stor_id,
												work_date :work_date }));
								detail.select({
									callback:function(records, operation, success) {
										if (success) {
											detail.getSelectionModel().select(0);
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge( { wkct_idcd : value,
												stor_id   : _global.stor_id,
												work_date :work_date }));
								detail2.select({
									callback:function(records, operation, success) {
										if (success) {
											detail.getSelectionModel().select(0);
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge( { wkct_idcd : value,
												work_date : work_date,
												stor_id : _global.stor_id}));
								mask.hide();
							},
							change:function(feild,value,a){
								var lister = Ext.ComponentQuery.query('module-workbookv3-lister')[0],
									detail = Ext.ComponentQuery.query('module-workbookv3-detail')[0],
									detail2 = Ext.ComponentQuery.query('module-workbookv3-detail2')[0],
									work_date = Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd"),
									mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask })
								;
								mask.show();

								lister.select({
									callback:function(records, operation, success) {
										if (success) {
											lister.getSelectionModel().select(0);
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge({ wkct_idcd : value,
												stor_id  : _global.stor_id,
												work_date:work_date }));
								detail.select({
									callback:function(records, operation, success) {
										if (success) {
											detail.getSelectionModel().select(0);
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge({ wkct_idcd : value,
												stor_id  : _global.stor_id,
												work_date:work_date }));
								detail2.select({
									callback:function(records, operation, success) {
										if (success) {
											detail.getSelectionModel().select(0);
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge({	wkct_idcd : value,
												work_date : work_date,
												stor_id  : _global.stor_id,
												work_date:work_date
								}) );
								mask.hide();

								Ext.util.Cookies.set('wkct_idcd', value);
							}
						}
					},{	fieldLabel	: '바코드',
						xtype		: 'textfield',
						name		: 'barcode',
						width		: 300,
						labelWidth	: 100,
						height		: 45,
						margin		: '0 0 0 10',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						style		: 'text-align:center',
						enableKeyEvents : true,
						listeners	: {
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER ) {
									var value = self.getValue().replace(/\//gi,'-');
									if(value == '' || value == null){
										return;
									}
									me.barcode(value);
									self.setValue('');
								}
							},
						},
					},{	buttonAlign	: 'center',
						xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:2.5em;">새로고침</span>',
						cls			: 'btn btn-warning',
						width		: 165,
						height		: 46,
						margin		: '0 0 0 30',
						style: 'text-decoration:none;',
						handler:function(){
							var	lister		= Ext.ComponentQuery.query('module-workbookv3-lister')[0],
								work_date	= Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd"),
								mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
								wkct_idcd	= me.down('[name=wkct_name]').getValue()
							;
							mask.show();
							lister.select({
								callback:function(records, operation, success) {
									if (success) {
										lister.getSelectionModel().select(0);
									} else { me.pocket.editor().getForm().reset(true);}
								}, scope:me
							}, Ext.merge({	wkct_idcd : wkct_idcd,
											stor_id   : _global.stor_id,
											work_date :work_date,
										}))
							mask.hide();
						}
					},{	buttonAlign	: 'right',
						xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:2.5em;">닫기</span>',
						cls			: 'button-right btn btn-danger',
						width		: 165,
						height		: 46,
						margin		: '0 0 0 0',
						style: 'text-decoration:none;',
						handler:function(){
							var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
							sideButton.click();
							me.up('panel').close();
						}
					}
				]
			}
		;
		return line;
	},
	barcode:function(val){
		var	search = Ext.ComponentQuery.query('module-workbookv3-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store = Ext.ComponentQuery.query('module-workbookv3-lister')[0].getStore(),
			store2 = Ext.ComponentQuery.query('module-workbookv3-detail')[0].getStore(),
			chk	= '',
			arg
		;
		var me = this;
		Ext.Ajax.request({																				// plan찾아오기
			url		: _global.location.http() + '/prod/order/workbookv3/get/searchBarcode.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					bar_code		: val,
					wkct_idcd		: wkct_idcd,
					dvcd			: 0
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
					chk = result.records.length;
					if(chk){
						arg = result.records[0];
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		if(!chk){
			Ext.Msg.error('잘못된 부품번호입니다.부품번호를 확인해주세요.');
			return;
		}
		if(arg.prog_stat_dvcd == '0'||arg.prog_stat_dvcd == '2'){
			var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 150,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'invc_date',
						xtype		: 'datefield',
						value		: searchDate,
						width		: 435,
						height		: 50,
						readOnly	: true,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						trigger1Cls : _global.hq_id+'dateTrigger',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						maxValue	: new Date(),
						listeners:{
						}
					},{	fieldLabel	: Language.get('work_sttm','시작시간'),
						name		: 'work_sttm',
						xtype		: 'timefield',
						format		: 'H:i',
						submitFormat: 'Hi',
						hideTrigger	: true,
						readOnly	: true,
						value		: new Date(),
						minValue	: '00:00 AM',
						maxValue	: '23:59 PM',
						width		: 433,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						listConfig:{
							itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
						},
					}
//					,{	fieldLabel	: Language.get('wker_name','작업자'),
//						value		: '',
//						width		: 450,
//						height		: 50,
//						labelStyle	: 'line-height: 75px;',
//						labelCls	: 'textTemp '+_global.hq_id+'label',
//						fieldCls	: 'textTemp '+_global.hq_id+'field',
//						cls			: 'textTemp',
//						xtype		: 'popupfield',
//						editable	: true,
//						enableKeyEvents : true,
//						name		: 'wker_name',
//						pair		: 'wker_idcd',
//						trigger1Cls : _global.hq_id+'searchTrigger',
//						clearable	: false ,
//						value		: _global.login_nm,
//						popup: {
//							select : 'SINGLE',
//							widget : 'lookup-workbookv3-user-popup',
//							params : { stor_grp : _global.stor_grp , row_sts : '0', wkct_idcd : wkct_idcd},
//							result : function(records, nameField, pairField) {
//								nameField.setValue(records[0].get('user_name'));
//								pairField.setValue(records[0].get('user_idcd'));
//							}
//						}
//					},{	name : 'wker_idcd', xtype : 'textfield' , hidden : true, value : _global.login_pk,
//					},{	fieldLabel	: Language.get('dayn_dvcd', '주/야 구분'),
//						labelCls	: 'textTemp '+_global.hq_id+'label',												// label에 클래스추가
//						fieldCls	: 'textTemp '+_global.hq_id+'field',												// field에 클래스추가
//						xtype		: 'lookupfield',
//						name		: 'dayn_dvcd',
//						trigger1Cls : _global.hq_id+'trigger',											// trigger(버튼)에 클래스 추가
//						width		: 450,
//						lookupValue	: resource.lookup('dayn_dvcd'),
//						height		: 50,
//						margin		: '15 0 0 0',
//						multiSelect	: false ,
//						editable	: false,
//						value		: '1',
//						listConfig:{
//							itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
//						},
//					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
							if(param.invc_date==null || param.invc_date ==''){
								Ext.Msg.alert("알림","작업일자를 반드시 입력해주십시오.");
							}else if(param.work_sttm==null || param.work_sttm ==''){
								Ext.Msg.alert("알림","시작시간를 반드시 입력해주십시오.");
							}else{
								var new_invc_numb;
								Ext.Ajax.request({
									url		: _global.location.http() + '/listener/seq/maxid.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											stor_id	: _global.stor_id,
											table_nm: 'work_book'
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
											new_invc_numb = result.records[0].seq;
										}
									},
									failure : function(result, request) {
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});
								record = Ext.create( store.model.modelName , {
									invc_numb		: new_invc_numb,
									indn_qntt		: arg.indn_qntt,
									pdsd_numb		: arg.pdsd_numb,
									wkod_numb		: arg.wkod_numb,
									wkod_seqn		: arg.wkod_seqn,
									item_idcd		: arg.wkct_item_idcd,
									invc_date		: param.invc_date,
//									wker_idcd		: param.wker_idcd,
//									dayn_dvcd		: param.dayn_dvcd,
									work_sttm		: param.work_sttm+'00',
									wkct_idcd		: arg.wkct_idcd,
									mold_idcd		: arg.mold_idcd,
									mtrl_bacd		: arg.mtrl_bacd,
									lott_numb		: arg.lott_numb,
								});
								store.add(record);
								store.sync({
									callback: function(batch, options) {
										store.reload();
										store2.reload();
										this.up('form').getForm().reset();
										this.up('window').hide();
									} ,
									scope: this
								},{	synchro : _global.objects.synchro,_set : 'insert'} );
							}
						}
					},{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				]
			});
			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">시작</span>',
				closeAction: 'hide',
				width: 560,
				height: 280,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
		}else{
			var arg2;
			Ext.Ajax.request({																				// plan찾아오기
				url		: _global.location.http() + '/prod/order/workbookv3/get/searchBarcode.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						wkod_numb		: arg.wkod_numb,
						wkod_seqn		: arg.wkod_seqn,
						wkct_idcd		: wkct_idcd,
						dvcd			: arg.prog_stat_dvcd,
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
						if(chk){
							arg2 = result.records[0];
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			console.log(arg2);
			if(arg.prog_stat_dvcd == '1'){
				var	form = Ext.widget('form', {
					border: false,
					bodyPadding: 10,
					fieldDefaults: {
						labelWidth: 200,
						labelStyle: 'text-align:right',
						labelSeparator : '',
					},
					items:[
						{	fieldLabel	: Language.get('work_date','작업일자'),
							name		: 'invc_date',
							xtype		: 'datefield',
							width		: 535,
							height		: 50,
							readOnly	: true,
							labelStyle	: 'line-height: 75px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : _global.hq_id+'dateTrigger',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: searchDate,
							maxValue	: new Date(),
						},{	fieldLabel	: Language.get('work_edtm','종료시간'),
							name		: 'work_edtm',
							xtype		: 'timefield',
							format		: 'H:i',
							submitFormat: 'Hi',
							hideTrigger	: true,
							value		: new Date(),
							minValue	: '00:00 AM',
							maxValue	: '23:59 PM',
							readOnly	: true,
							width		: 533,
							height		: 50,
							labelStyle	: 'line-height: 75px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp'
						},{ xtype		: 'datefield',
							name		: 'work_endd_date',
							hidden		: true,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: new Date()
						},{	fieldLabel	: Language.get('prod_qntt','생산수량'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'prod_qntt',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							hideTrigger	: true,
							readOnly	: false,
							width		: 533,
							height		: 50,
							value		: ((arg.indn_qntt>0?arg.indn_qntt:0)-(arg.prod_qntt>0?arg.prod_qntt:0)),
							labelStyle	: 'line-height: 75px;',
							trigger1Cls : _global.hq_id+'searchTrigger',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger1')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},
							popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
							trigger1Cls : 'hideCls trigger1',
						},{	fieldLabel	: Language.get('wker_name','작업자'),
							value		: '',
							width		: 490,
							height		: 50,
							labelStyle	: 'line-height: 75px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'wker_name',
							pair		: 'wker_idcd',
							hidden		: Boolean(wkct_idcd != 'M005'),
							trigger1Cls : _global.hq_id+'searchTrigger',
							clearable	: false ,
							value		: _global.login_nm,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-workbookv3-user-popup',
								params : { stor_grp : _global.stor_grp , row_sts : '0', wkct_idcd : wkct_idcd},
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{	name : 'wker_idcd', xtype : 'textfield' , hidden : true , value	: _global.login_pk
						},{	fieldLabel	: Language.get('dayn_dvcd', '주/야 구분'),
							labelCls	: 'textTemp '+_global.hq_id+'label',												// label에 클래스추가
							fieldCls	: 'textTemp '+_global.hq_id+'field',												// field에 클래스추가
							xtype		: 'lookupfield',
							name		: 'dayn_dvcd',
							trigger1Cls : _global.hq_id+'trigger',											// trigger(버튼)에 클래스 추가
							width		: 490,
							lookupValue	: resource.lookup('dayn_dvcd'),
							height		: 50,
							margin		: '15 0 20 0',
							hidden		: Boolean(wkct_idcd != 'M005'),
							multiSelect	: false ,
							editable	: false,
							value		: '1',
							listConfig:{
								itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
							}
						},{	buttonAlign	: 'center',
							xtype		: 'button',
							text		: '<span class="btnTemp" style="font-size:2.5em;">검사항목 입력</span>',
							cls			: 'button-right btn btn-danger',
							width		: 300,
							height		: 46,
							margin		: '0 0 0 190',
							hidden		: Boolean(wkct_idcd != 'M005'),
							style: 'text-decoration:none;',
							handler:function(){
								//검사항목입력
								me.insp(arg2);
							}
						},{	buttonAlign	: 'center',
							xtype		: 'button',
							text		: '<span class="btnTemp" style="font-size:2.5em;">바코드 발행</span>',
							cls			: 'button-right btn btn-danger',
							width		: 300,
							height		: 46,
							margin		: '0 0 0 205',
							hidden		: Boolean(wkct_idcd != 'M011'),
							style: 'text-decoration:none;',
							handler:function(){
								me.print(arg2);
							}
						},{	buttonAlign	: 'center',
							xtype		: 'button',
							text		: '<span class="btnTemp" style="font-size:2.5em;">검사성적서 발행</span>',
							cls			: 'button-right btn btn-danger',
							width		: 300,
							height		: 46,
							margin		: '20 0 0 205',
							hidden		: Boolean(wkct_idcd != 'M011'),
							style: 'text-decoration:none;',
							handler:function(){
								me.print2(arg2);
							}
						},{	buttonAlign	: 'center',
							xtype		: 'button',
							text		: '<span class="btnTemp" style="font-size:2.5em;">납품검사성적서 발행</span>',
							cls			: 'button-right btn btn-danger',
							width		: 300,
							height		: 46,
							margin		: '20 0 0 205',
							hidden		: Boolean(wkct_idcd != 'M011'),
							style: 'text-decoration:none;',
							handler:function(){
								me.print3(arg2);
							}
						}
					],
					buttons: [
						{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
							cls: 'button-style',
							flex:1,
							height:50,
							handler: function() {
								var param = Ext.merge( this.up('form').getValues() );
									sttm_temp2 = arg2.work_strt_dttm.replace(/-/gi,""),
									sttm_temp1 = sttm_temp2.replace(/:/gi,""),
									sttm_temp  = sttm_temp1.replace(/\s/gi, ""),
									sttm_hour = sttm_temp.substring('8','10');
									edtm_hour = param.work_edtm.substring('0','2');
									sttm_min = sttm_temp.substring('10','12');
									edtm_min = param.work_edtm.substring('2','4');
								if(param.prod_qntt==null||param.prod_qntt==''){
									Ext.Msg.alert("알림","생산수량을 반드시 입력해주십시오.");
								}else{
									var time  = edtm_hour-sttm_hour;
									var min   = edtm_min-sttm_min;
									if(min < 0){
										time = edtm_hour-sttm_hour-1;
										min  = edtm_min-sttm_min + 60;
									}
									var total = (time*60)+min;
									record = Ext.create( store.model.modelName , {
										invc_numb		: arg2.invc_numb,
										wkod_numb		: arg2.wkod_numb,
										wkod_seqn		: arg2.wkod_seqn,
										pdsd_numb		: arg2.pdsd_numb,
										item_idcd		: arg2.item_idcd,
										wkct_idcd		: param.wkct_idcd,
										dayn_dvcd		: param.dayn_dvcd,
										work_sttm		: arg2.work_sttm,
										work_edtm		: param.work_edtm+'00',
										invc_date		: param.invc_date,
										prod_qntt		: param.prod_qntt,
										need_time		: total,
										invc_date		: param.invc_date,
										pitch			: store.data.items[0].data.pitch,
										lead_angl		: store.data.items[0].data.lead_angl,
										h_valu			: store.data.items[0].data.h_valu,
										a_valu			: store.data.items[0].data.a_valu,
										b_valu			: store.data.items[0].data.b_valu,
										tick_valu		: store.data.items[0].data.tick_valu,
										widh_valu		: store.data.items[0].data.widh_valu
									});
									store.add(record);
									if(wkct_idcd == 'M005'){
										if(store.data.items[0].data.pitch == '0' || store.data.items[0].data.lead_angl =='' || store.data.items[0].data.h_valu == '0' ||
												store.data.items[0].data.a_valu == '0' || store.data.items[0].data.b_valu == '0' ||
												store.data.items[0].data.tick_valu == '0' || store.data.items[0].data.widh_valu == '0'){
											Ext.Msg.alert("알림","검사항목을 입력하여 주십시오.");
											return;
										}
									}
									store.sync({
										callback: function(batch, options) {
											store.reload();
											store2.reload();
											this.up('form').getForm().reset();
											this.up('window').destroy();
										} ,
										scope: this
									},{	synchro : _global.objects.synchro,_set : 'end'} );
								}
							}
						},{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
							cls: 'button-style',
							flex:1,
							height:50,
							handler: function() {
								this.up('form').getForm().reset();
								this.up('window').destroy();

//								this.up('window').hide();
							}
						}
					]

				});

				win = Ext.widget('window', {
					title: '<span class="btnTemp" style="font-size:15px; color:black;">종료</span>',
					closeAction: 'hide',
					width: 650,
					height: wkct_idcd == 'M005'?590:360 && wkct_idcd == 'M011'?555:360,
					layout: 'fit',
					resizable: true,
					modal: true,
					items: form,
					defaultFocus: ''
				});
				win.show();

			}else if(arg.prog_stat_dvcd == '3'){
				var	form = Ext.widget('form', {
					border: false,
					bodyPadding: 10,
					fieldDefaults: {
						labelWidth: 200,
						labelStyle: 'text-align:right',
						labelSeparator : '',
					},
					items:[
						{	xtype		: 'label',
							text		: '추가작업하시겠습니까?',
							cls			: 'textTemp',
							style	: 'font-size:4em;'
						},{	fieldLabel	: Language.get('work_date','작업일자'),
							name		: 'invc_date',
							xtype		: 'datefield',
							value		: new Date(),
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							maxValue	: new Date(),
							hidden		: true
						}
					],
					buttons: [
						{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
							cls: 'button-style',
							flex:1,
							height:50,
							handler: function() {
								var param = Ext.merge( this.up('form').getValues() );
								record = Ext.create( store.model.modelName , {
									invc_numb		: arg2.invc_numb,
									wkod_numb		: arg2.wkod_numb,
									wkod_seqn		: arg2.wkod_seqn,
									cvic_idcd		: arg2.cvic_idcd,
									pdsd_numb		: arg2.pdsd_numb,
									work_sttm		: arg2.work_sttm,
									prod_qntt		: arg2.prod_qntt,
									invc_date		: param.invc_date
								});
								store.add(record);
								store.sync({
									callback: function(batch, options) {
										store.reload();
										store2.reload();
										this.up('form').getForm().reset();
										this.up('window').hide();
									} ,
									scope: this
								},{	synchro : _global.objects.synchro,_set : 'restart'} );
							}
						},
						{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
							cls: 'button-style',
							flex:1,
							height:50,
							handler: function() {
								this.up('form').getForm().reset();
								this.up('window').hide();
							}
						}
					]

				});

				win = Ext.widget('window', {
					title: '<span class="btnTemp" style="font-size:15px; color:black;">취소</span>',
					closeAction: 'hide',
					width: 500,
					height: 180,
					layout: 'fit',
					resizable: true,
					modal: true,
					items: form,
					defaultFocus: ''
				});
				win.show();
			}
		}
	},

	print : function(arg2){
		var jrf = 'NboltBarcode.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		if(arg2.wkct_idcd == 'M011'){
			var invc_numb = arg2.wkod_numb;
			var arg = 'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1200,height=600'),
			});
		}
	},

	print2 : function(arg2){
		var jrf2 = 'NboltInspCheck.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		if(arg2.wkct_idcd == 'M011'){
			var invc_numb = arg2.wkod_numb;
			var arg = 'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf2+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1200,height=600'),
			});
		}
	},

	print3 : function(arg2){
		var jrf3 = 'NboltInspCheck2.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		if(arg2.wkct_idcd == 'M011'){
			var invc_numb = arg2.wkod_numb;
			var arg = 'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf3+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1200,height=600'),
			});
		}
	},

	//공정검사입력
	insp : function(arg2){
		var me = this;
		var array;
		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/order/workbookv3/get/desc.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id		: _global.stor_id,
					item_idcd	: arg2.item_idcd,
					invc_numb2	: arg2.wkod_numb
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
					array = result.records;
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		var lead_angl1, lead_angl2;
		lead_angl1 = array[0].lead_angl1?array[0].lead_angl1.split('도')[0]:'';
		lead_angl2 = array[0].lead_angl1?array[0].lead_angl1.split('도')[1].split('분')[0]:'';

		var store = Ext.ComponentQuery.query('module-workbookv3-lister')[0].getStore();
		var	form = Ext.widget('form', {
			border: false,
			itemId: 'insp',
			bodyPadding: 10,
			fieldDefaults: {
				labelWidth: 120,
				labelStyle: 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
					items	: [
						{	fieldLabel	: 'Pitch',
							name		: 'pitch1',
							xtype		: 'textfield',
							value		: array[0].pitch1,
							readOnly	: true,
							width		: 300,
							height		: 50,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
						},{	name		: 'pitch',
							xtype		: 'popupfield',
							width		: 300,
							height		: 50,
							margin		: '3 0 0 10',
							value		: array[0].pitch1,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger2',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger2')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
					items	: [
						{	fieldLabel	: '리드각',
							name		: 'lead_angl1',
							xtype		: 'textfield',
							value		: array[0].lead_angl1,
							readOnly	: true,
							width		: 300,
							height		: 50,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
						},{	name		: 'lead_angl2',
							xtype		: 'popupfield',
							width		: 115,
							height		: 50,
							value		: lead_angl1,
							margin		: '3 0 0 10',
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger3',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger3')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						},{	xtype		: 'label',
							text		: '도',
							margin		: '8 0 0 5',
							style		: 'text-align:left; font-size: 2.3em !important;',
						},{	name		: 'lead_angl3',
							xtype		: 'popupfield',
							width		: 115,
							height		: 50,
							margin		: '3 0 0 10',
							value		: lead_angl2,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger4',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger4')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						},{	xtype		: 'label',
							text		: '분',
							margin		: '8 0 0 5',
							style		: 'text-align:left; font-size: 2.3em !important;',
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
					items	: [
						{	fieldLabel	: 'h',
							name		: 'h_valu1',
							xtype		: 'textfield',
							value		: array[0].h_valu1,
							readOnly	: true,
							width		: 300,
							height		: 50,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
						},{	name		: 'h_valu',
							xtype		: 'popupfield',
							width		: 300,
							height		: 50,
							margin		: '3 0 0 10',
							value		: array[0].h_valu1,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger5',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger5')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
					items	: [
						{	fieldLabel	: 'a',
							name		: 'a_valu1',
							xtype		: 'textfield',
							value		: array[0].a_valu1,
							readOnly	: true,
							width		: 300,
							height		: 50,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
						},{	name		: 'a_valu',
							xtype		: 'popupfield',
							width		: 300,
							height		: 50,
							margin		: '3 0 0 10',
							value		: array[0].a_valu1,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger6',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger6')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
					items	: [
						{	fieldLabel	: 'b',
							name		: 'b_valu1',
							xtype		: 'textfield',
							value		: array[0].b_valu1,
							readOnly	: true,
							width		: 300,
							height		: 50,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
						},{	name		: 'b_valu',
							xtype		: 'popupfield',
							width		: 300,
							height		: 50,
							margin		: '3 0 0 10',
							value		: array[0].b_valu1,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger7',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger7')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
					items	: [
						{	fieldLabel	: 'T(두께)',
							name		: 'tick_valu1',
							xtype		: 'textfield',
							value		: array[0].tick_valu1,
							readOnly	: true,
							width		: 300,
							height		: 50,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
						},{	name		: 'tick_valu',
							xtype		: 'popupfield',
							width		: 300,
							height		: 50,
							margin		: '3 0 0 10',
							value		: array[0].tick_valu1,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger8',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger8')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
					items	: [
						{	fieldLabel	: 'W(폭)',
							name		: 'widh_valu1',
							xtype		: 'textfield',
							readOnly	: true,
							value		: array[0].widh_valu1,
							width		: 300,
							height		: 50,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
						},{	name		: 'widh_valu',
							xtype		: 'popupfield',
							width		: 300,
							height		: 50,
							margin		: '3 0 0 10',
							value		: array[0].widh_valu1,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger9',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger9')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
					items	: [
						{	fieldLabel	: '경도',
							name		: 'make_name',
							xtype		: 'textfield',
							value		: array[0].make_name,
							readOnly	: true,
							width		: 300,
							height		: 50,
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
						},{
							name		: 'long_valu',
							xtype		: 'popupfield',
							width		: 300,
							height		: 50,
							margin		: '3 0 0 10',
							labelStyle	: 'line-height: 50px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							trigger1Cls : 'hideCls trigger10',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger10')[0];
										Ext.get(trigger1).dom.click();
									});
								}
							},popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].result);
								}
							},
						}
					]
				}
			],
			buttons: [
				{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						var values = this.up('form').getValues();
						var lead = values.lead_angl2 + '도' + values.lead_angl3 + '분';
						var lister = Ext.ComponentQuery.query('module-workbookv3-lister')[0];
						var selectedRecord = lister.getSelectionModel().getSelection()[0];
						var row = lister.getStore().indexOf(selectedRecord);
						store.each(function(record,idx){
							if(idx == row){
								record.set('pitch',values.pitch);
								record.set('lead_angl',lead);
								record.set('h_valu',values.h_valu);
								record.set('a_valu',values.a_valu);
								record.set('b_valu',values.b_valu);
								record.set('tick_valu',values.tick_valu);
								record.set('widh_valu',values.widh_valu);
								record.set('long_valu',values.long_valu);
								record.commit();
							}
						});
						console.log(store);
						this.up('window').destroy();
					}
				},{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						this.up('form').getForm().reset();
						this.up('window').destroy();
					}
				}
			]
		});
		win = Ext.widget('window', {
			title: '<span class="btnTemp" style="font-size:15px; color:black;">검사항목 입력</span>',
			closeAction: 'hide',
			width: 700,
			height: 645,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();

	},
});