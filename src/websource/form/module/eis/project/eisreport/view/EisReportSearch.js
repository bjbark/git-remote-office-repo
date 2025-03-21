Ext.define('module.eis.project.eisreport.view.EisReportSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-eisreport-search',

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
						if(result.records[i].wkct_stnm != '설계' && result.records[i].wkct_stnm != '전극'){
							wkctLookup.push([result.records[i].wkct_idcd,result.records[i].wkct_stnm]);
						}
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
				xtype	: 'fieldset'
				,border	: 0
				,style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' }
				,region	: 'center'
				,width	: '100%'
				,height	: 65
				,margin	: '10 40 0 10'
				,autoScroll: true
				,items	: [
					{
						xtype: 'fieldset',
						layout: 'hbox',
						border	: 0,
						height:50,
						items: [
							{	fieldLabel	: '작업일자',
								xtype		: 'datefield',
								name		: 'today',
								width		: 400,
								maxWidth	: 500,
								labelWidth	: 187,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								readOnly	: true,
								height		: 45,
								value		: new Date(),
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								style		: 'text-align:center',
								listeners	:{
									render:function(field,value){
										var today = null;
										today = setInterval(function(){
											if(me.ownerCt){
												field.setValue(new Date());
											}else{
												clearInterval(today);
											}
										}, 60000)
									}
								}
							}
						]
					},{	fieldLabel	: Language.get('wkct_name', '작업공정'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
						xtype		: 'lookupfield',
						name		: 'wkct_name',
						trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
						width		: 430,
						multiSelect	: false ,
						editable	: true,
						lookupValue	: wkctLookup,
						height		: 45,
						maxWidth	: 500,
						labelWidth	: 200,
						listConfig:{
							itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
						},
						listeners:{
							change:function(feild,value){
								if(document.getElementById('label1')){
									var detail5 = Ext.ComponentQuery.query('module-eisreport-lister-detail5')[0];
									var detail4 = Ext.ComponentQuery.query('module-eisreport-lister-detail4')[0];
									var detail3 = Ext.ComponentQuery.query('module-eisreport-lister-detail3')[0];
									var detail2 = Ext.ComponentQuery.query('module-eisreport-lister-detail2')[0];
									console.log(document.getElementById('label2'));
									document.getElementById('label1').innerHTML =  feild.rawValue+' 대기 부품';
									document.getElementById('label2').innerHTML =  feild.rawValue+' 진행 부품';
									if(feild.rawValue == '사출'){
										detail2.hide();
										detail3.hide();
										detail4.show();
										detail5.show();
										document.getElementById('label3').innerHTML =  feild.rawValue+' 대기 부품';
										document.getElementById('label4').innerHTML =  feild.rawValue+' 진행 부품';
									}else{
										detail2.show();
										detail3.show();
										detail4.hide();
										detail5.hide();
									}
								}
								var wkct_idcd = me.down('[name=wkct_idcd]');
								clearInterval(window.settime);
								wkct_idcd.setValue(value);
								me.reload(value);
								console.log(window.stop);
								if(window.stop == 0){
									window.settime = setInterval(function(){
										me.select();
									}, 300000)//5분
								}
							}
						}
					},{ xtype	: 'textfield',
						name	: 'wkct_idcd',
						hidden	: true
					},{	xtype	: 'label',
						text	: '',
						style	: "text-align:right;margin:0 10px 0 40px;",
						width	: 20,
						cls		: 'textTemp '+_global.options.work_book_tema+'label',
					},{	xtype	: 'button',
						text	: '<span class="btnTemp" style="font-size:2em;font-weight: bold; color : black;">화면 정지</span>',
						toggleGroup:'onoff',
						id : 'toggleonoff',
						width : 130,
						style	: 'margin:5px 5px 12px 12px',
						cls		: 'toggleon btn btnTemp '+_global.options.work_book_tema+'button',
						listeners:{
							toggle:function(toggle){
								if(window.stop == 0){
									this.setText('<span class="btnTemp" style="font-size:2em;font-weight: bold;color : black;">정지 해제</span>');
									clearInterval(window.settime);
									window.stop = 1;
								}else{
									this.setText('<span class="btnTemp" style="font-size:2em;font-weight: bold; color : black;">화면 정지</span>');
									clearInterval(window.settime);
									var value = me.down('[name=wkct_idcd]').getValue();
									me.reload(value);
									window.stop = 0;
									window.settime = setInterval(function(){
										me.select();
									}, 300000)//5분
								}
							}
						}
					},{	buttonAlign	: 'right',
						xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:25px;">닫기</span>',
						cls			: 'button-right btn btn-danger',
						width		: 200,
						height		: 50,
						style: 'text-decoration:none;',
						handler:function(){
							clearInterval(window.settime);
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
	select : function(){
		var me = this
			tpanel	= Ext.ComponentQuery.query('module-eisreport-layout')[0].down('#mainpanel'),
			tindex	= tpanel.items.indexOf(tpanel.getActiveTab())
		;
		tindex++;
		if(tindex == 4){
			tindex = 0;
		}
			tpanel.setActiveTab(tindex);
	},
	reload : function(param){
		var me = this
			listermaster	= Ext.ComponentQuery.query('module-eisreport-lister-master')[0] ,
			listerdetail	= Ext.ComponentQuery.query('module-eisreport-lister-detail')[0] ,
			listerdetail2	= Ext.ComponentQuery.query('module-eisreport-lister-detail2')[0],
			listerdetail3	= Ext.ComponentQuery.query('module-eisreport-lister-detail3')[0],
			listerdetail4	= Ext.ComponentQuery.query('module-eisreport-lister-detail4')[0],
			listerdetail6	= Ext.ComponentQuery.query('module-eisreport-lister-detail6')[0],
			tpanel			= Ext.ComponentQuery.query('module-eisreport-layout')[0].down('#mainpanel'),
			tindex			= tpanel.items.indexOf(tpanel.getActiveTab()),
			lister1			= undefined,
			lister2			= undefined,
			ordr_dvcd		= undefined
		;
		if(tindex == 0){
			lister1 = listermaster;
			lister2 = listerdetail;
			ordr_dvcd = listerdetail.down('[name=ordr_dvcd]').getValue();
		}else if(tindex == 1){
			if(param == '004'){
				lister1 =  listerdetail4;
			}else{
				lister1 =  listerdetail2;
			}
				lister2 =  listerdetail3;

		}else if(tindex == 2){
			document.getElementById('iframe').contentDocument.location.reload(true);
		}else if(tindex ==3){
			document.getElementById('iframe2').contentDocument.location.reload(true);
		}
		if(tindex != 2 && tindex != 3  ){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister1.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {
					}
				}, scope:me
			}, Ext.merge({stor_id : _global.stor_id,wkct_idcd : param}) );

			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge({stor_id : _global.stor_id,wkct_idcd : param,work_ordr_dvcd:ordr_dvcd}) );
		}
	}

});