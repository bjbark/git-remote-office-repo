Ext.define('module.prod.project.prjtworkentry.view.PrjtWorkEntrySearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-prjtworkentry-search',

	initComponent: function(){
		var me = this;
		var wkctLookup = new Array();

		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/basic/wkctmast/get/lookup.do',
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
						wkctLookup.push([result.records[i].wkct_idcd,result.records[i].wkct_stnm]);
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				console.log(wkctLookup);
			}
		});
		console.log(_global.hq_id);
		me.items =[ me.searchBasic(wkctLookup)];
		me.callParent();
	},

	searchBasic : function(wkctLookup){
		var me = this,
			line = {
				xtype	: 'fieldset'
				,border	: 0
				,style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' }
				,region	: 'center'
				,width	: '100%'
				,height	: _global.hq_id == 'N1000WONTC'? 50 : 65
				,margin	: '10 40 0 10'
				,autoScroll: true
				,items	: [
					{
						xtype: 'fieldset',
						layout: 'hbox',
						border	: 0,
						items: [
							{	fieldLabel	: '작업일자',
								xtype		: 'datefield',
								name		: 'work_date',
								width		: _global.hq_id.toUpperCase() == 'N1000WONTC'? 340 : 400,
								maxWidth	: 500,
								value		: new Date(),
								labelWidth	: _global.hq_id.toUpperCase() == 'N1000WONTC'? 140 : 187,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								readOnly	: true,
								height		: _global.hq_id.toUpperCase() == 'N1000WONTC'? 40 : 45,
								labelCls	: 'textTemp '+_global.hq_id+'label',
								fieldCls	: 'textTemp '+_global.hq_id+'field',
								cls			: 'textTemp',
								style		: 'text-align:center',
							}
						]
					},{	fieldLabel	: Language.get('wkct_name', '작업공정'),
						labelCls	: 'textTemp '+_global.hq_id+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.hq_id+'field',												// field에 클래스추가
						xtype		: 'lookupfield',
						name		: 'wkct_name',
						trigger1Cls : _global.hq_id+'trigger',											// trigger(버튼)에 클래스 추가
						width		: _global.hq_id.toUpperCase() == 'N1000WONTC'? 365 : 430,
						multiSelect	: false ,
						editable	: false,
						lookupValue	: wkctLookup,
						height		: _global.hq_id.toUpperCase() == 'N1000WONTC'? 40 : 45,
						maxWidth	: 500,
						labelWidth	: _global.hq_id.toUpperCase() == 'N1000WONTC'? 130 : 200,
						listConfig:{
							itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
						},
						listeners:{
							change:function(feild,value){
								var lister = Ext.ComponentQuery.query('module-prjtworkentry-lister')[0];
								var detail = Ext.ComponentQuery.query('module-prjtworkentry-detail')[0];
								var detail2 = Ext.ComponentQuery.query('module-prjtworkentry-detail2')[0];
								var work_date = Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd");
								var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
								mask.show();
								lister.select({
									callback:function(records, operation, success) {
										if (success) {
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge( {wkct_idcd : value,stor_id : _global.stor_id,work_date:work_date}) );
								detail.select({
									callback:function(records, operation, success) {
										if (success) {
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge( {wkct_idcd : value,stor_id : _global.stor_id}) );
								detail2.select({
									callback:function(records, operation, success) {
										if (success) {
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge( {wkct_idcd : value,stor_id : _global.stor_id}) );
								mask.hide();
							}
						}
					},{	fieldLabel	: '바코드',
						xtype		: 'textfield',
						name		: 'barcode',
						width		: 400,
						maxWidth	: 500,
						labelWidth	: _global.hq_id.toUpperCase() == 'N1000WONTC'? 140 : 170,
						height		: _global.hq_id.toUpperCase() == 'N1000WONTC'? 40 : 45,
						margin		: '0 0 0 40',
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
						text		: '<span class="btnTemp" style="font-size:1.5em;">작업일지</span>',
						cls			: 'btn btn-primary',
						width		: 150,
						height		: 40,
						margin		: '3 0 0 50',
						style: 'text-decoration:none; line_height:60px;',
						handler:function(){
							me.datePopup();
						}
					},{	buttonAlign	: 'right',
						xtype		: 'button',
						name		: 'closebtn',
						text		: _global.hq_id.toUpperCase() == 'N1000WONTC'? '<span class="btnTemp" style="font-size:2em;">닫기</span>' : '<span class="btnTemp" style="font-size:3em;">닫기</span>',
						cls			: 'button-right btn btn-danger',
						width		: 200,
						height		: _global.hq_id.toUpperCase() == 'N1000WONTC'? 40 : 60,
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
	datePopup:function(){
		var	me			= this,
			form = Ext.widget('form', {
			border: false,
			bodyPadding: 10,
			fieldDefaults: {
				labelWidth: 60,
				labelStyle: 'text-align:right',
				width		: 280,
				labelSeparator : '',
			},
			items:[
				{	xtype		: 'label',
					text		: '작업일을 선택해주세요.',
					height		: 30,
					cls			: 'textTemp '+_global.hq_id+'label',
					margin		: '0 0 30 0'
				},{	fieldLabel	: Language.get('defaultdate','작업시작일'),
					xtype		: 'datefield',
					name		: 'invc_date',
					labelCls	: 'textTemp '+_global.hq_id+'label',
					fieldCls	: 'textTemp '+_global.hq_id+'field',
					trigger1Cls : _global.hq_id+'dateTrigger',
					value		: new Date(),
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					labelWidth	: 200,
					width		: 420,
					height		: 45,
				},
			],
			buttons: [
				{	text: '<span class="btnTemp" style="font-size:1.5em">확인</span>',
					width : 100,
					height : 30,
					cls: 'button-style',
					handler: function() {
						var me = this;
						var param = Ext.merge( this.up('form').getValues() );
						if(param.invc_date){
							var jrf		= 'workbook.jrf',
								resId	= _global.hq_id.toUpperCase(),
								arg = 'invc_date~'+param.invc_date+'~';
								url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}'
								win = window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=950');
								this.up('window').hide();
								return win;
						}else{
							Ext.Msg.alert("알림","작업시작일을 선택해주세요.");
						}
					}
				},
				{	text: '<span class="btnTemp" style="font-size:1.5em">취소</span>',
					cls: 'button-style',
					width : 100,
					height : 30,
					handler: function() {
						this.up('window').hide();
					}
				}
			],
		});
		win = Ext.widget('window', {
			title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">작업일정작성</span>',
			closeAction: 'hide',
			width: 500,
			height: 200,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();
	},
	barcode:function(val){
		var search = Ext.ComponentQuery.query('module-prjtworkentry-search')[0],
		searchDate = search.down('[name=work_date]').getValue(),
		wkct_idcd = search.down('[name=wkct_name]').getValue(),
		store = Ext.ComponentQuery.query('module-prjtworkentry-lister')[0].getStore(),
		store2 = Ext.ComponentQuery.query('module-prjtworkentry-detail')[0].getStore(),
		chk	= '',
		arg
	;
		Ext.Ajax.request({																				// plan찾아오기
			url		: _global.location.http() + '/prod/project/prjtworkentry/get/searchDetail3.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					work_item_idcd	: val,
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
		console.log(arg.prog_stat_dvcd);
		if(!chk){
			Ext.Msg.error('잘못된 부품번호입니다.부품번호를 확인해주세요.');
			return;
		}
		if(arg.prog_stat_dvcd != '3'){
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
						name		: 'work_date',
						xtype		: 'datefield',
						value		: searchDate,
						width		: 550,
						height		: 50,
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
						value		: new Date(),
						minValue: '00:00 AM',
						maxValue: '23:59 PM',
						width		: 533,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						listConfig:{
							itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
						},
					},{	fieldLabel	: Language.get('wker_idcd_1fst','작업자'),
						value		: '',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wker_name_1fst',
						pair		: 'wker_idcd_1fst',
						trigger1Cls : _global.hq_id+'searchTrigger',
						clearable	: false ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-prjt-wkctmans-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('empy_name'));
								pairField.setValue(records[0].get('empy_idcd'));
							}
						}
					},{	name : 'wker_idcd_1fst', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('cstm_name',' '),
						value		: '',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wker_name_2snd',
						trigger1Cls : _global.hq_id+'searchTrigger',
						pair		: 'wker_idcd_2snd',
						margin		: '0 0 20 0',
						clearable	: false ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-prjt-wkctmans-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('empy_name'));
								pairField.setValue(records[0].get('empy_idcd'));
							}
						}
					},{	name : 'wker_idcd_2snd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('cstm_name',' '),
						value		: '',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						trigger1Cls : _global.hq_id+'searchTrigger',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wker_name_3trd',
						pair		: 'wker_idcd_3trd',
						clearable	: false ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-prjt-wkctmans-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('empy_name'));
								pairField.setValue(records[0].get('empy_idcd'));
							}
						}
					},{	name : 'wker_idcd_3trd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('cstm_name','설비'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'cvic_name',
						pair		: 'cvic_idcd',
						value		: '',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						trigger1Cls : _global.hq_id+'searchTrigger',
						popup: {
							select : 'SINGLE',
							widget : 'lookup-prjt-wkctcvic-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('cvic_name'));
								pairField.setValue(records[0].get('cvic_idcd'));
							}
						}
					},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var seq;
							Ext.Ajax.request({
								url		: _global.location.http() + '/prod/project/prjtworkentry/get/getSeqn.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										pjod_idcd		: arg.pjod_idcd,
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
										seq = result.records[0].seq+1;
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
							var param = Ext.merge( this.up('form').getValues() );
							record = Ext.create( store.model.modelName , {
								pjod_idcd		: arg.pjod_idcd,
								item_idcd		: arg.work_item_idcd,
								line_seqn		: arg.line_seqn,
								wkct_idcd		: arg.wkct_idcd,
								idcd			: arg.idcd,
								prnt_idcd		: arg.prnt_idcd,
								work_ordr_dvcd	: arg.work_ordr_dvcd,
								ordr_degr		: arg.ordr_degr,
								name			: arg.item_name,
								invc_date		: param.work_date,
								wker_idcd		: param.wker_idcd_1fst,
								wker_idcd_1fst	: param.wker_idcd_1fst,
								wker_idcd_2snd	: param.wker_idcd_2snd,
								wker_idcd_3trd	: param.wker_idcd_3trd,
								work_sttm		: param.work_sttm+'00',
								cvic_idcd		: param.cvic_idcd,
								line_seqn2		: seq
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
				title: '<span class="btnTemp" style="font-size:15px; color:black;">시작</span>',
				closeAction: 'hide',
				width: 650,
				height: 550,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
		}else{
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
						name		: 'work_date',
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
								pjod_idcd		: arg.get('pjod_idcd'),
								line_seqn		: arg.get('line_seqn'),
								wkct_idcd		: arg.get('wkct_idcd'),
								idcd			: arg.get('idcd'),
								ordr_degr		: arg.get('ordr_degr'),
								work_ordr_dvcd	: arg.get('work_ordr_dvcd'),
								invc_date		: param.work_date,
								line_seqn2		: arg.get('line_seqn2')
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
				title: '<span class="btnTemp" style="font-size:15px; color:black;">추가작업</span>',
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

});