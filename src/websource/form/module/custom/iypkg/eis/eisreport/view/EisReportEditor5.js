Ext.define('module.custom.iypkg.eis.eisreport.view.EisReportEditor5', { extend: 'Axt.form.Editor',
	alias		: 'widget.module-eisreport-editor5'			,
	border		: 0,

	columnLines : false,

	initComponent: function () {
		var me = this;
		me.items = [me.createwest()];
		me.callParent();

		clearInterval(window.shot51);
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/eis/eisreport/get/search.do',
			method		: "POST",
			async		: false,
			params		: {
				token	: _global.token_id,
				param	: JSON.stringify({
					stor_id		: _global.stor_id,
					hqof_idcd	: _global.hqof_idcd,
					num			: '5'
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if(result.records[0]){
					me.down('[name=c_name]').setValue(result.records[0].cvic_name);
					me.down('[name=cvic_idcd]').setValue(result.records[0].cvic_idcd);
					me.down('[name=cvic_name]').setText(result.records[0].cvic_name);
					me.down('[name=cstm_name]').setText(result.records[0].cstm_name != undefined?result.records[0].cstm_name:'');
					me.down('[name=item_name]').setText(result.records[0].item_name != undefined?result.records[0].item_name:'');
					me.down('[name=indn_qntt]').setText(result.records[0].indn_qntt != undefined?result.records[0].indn_qntt:'');
					me.down('[name=work_strt_dttm]').setText(result.records[0].work_strt_dttm != undefined?result.records[0].work_strt_dttm:'');
					me.down('[name=wkod_numb]').setValue(result.records[0].wkod_numb);
					me.down('[name=wkod_seqn]').setValue(result.records[0].wkod_seqn);
					me.down('[name=pkg_qntt]').setValue(result.records[0].pkg_qntt);
				}
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});

		window.shot51 = setInterval(function(){
			Ext.Ajax.request({
				url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/eis/eisreport/get/search.do',
				method		: "POST",
				async		: false,
				params		: {
					token	: _global.token_id,
					param	: JSON.stringify({
						stor_id		: _global.stor_id,
						hqof_idcd	: _global.hqof_idcd,
						num			: '5'
					})
				},
				success : function(response, request) {
					var object = response,
						result = Ext.decode(object.responseText)
					;
					if(result.records[0]){
						me.down('[name=c_name]').setValue(result.records[0].cvic_name);
						me.down('[name=cvic_idcd]').setValue(result.records[0].cvic_idcd);
						me.down('[name=cvic_name]').setText(result.records[0].cvic_name);
						me.down('[name=cstm_name]').setText(result.records[0].cstm_name != undefined?result.records[0].cstm_name:'');
						me.down('[name=item_name]').setText(result.records[0].item_name != undefined?result.records[0].item_name:'');
						me.down('[name=indn_qntt]').setText(result.records[0].indn_qntt != undefined?result.records[0].indn_qntt:'');
						me.down('[name=work_strt_dttm]').setText(result.records[0].work_strt_dttm != undefined?result.records[0].work_strt_dttm:'');
						me.down('[name=wkod_numb]').setValue(result.records[0].wkod_numb);
						me.down('[name=wkod_seqn]').setValue(result.records[0].wkod_seqn);
						me.down('[name=pkg_qntt]').setValue(result.records[0].pkg_qntt);
					}
				},
				failure : function(response, request) {
					resource.httpError(response);
				},
				callback : function() {
				}
			});
		},30000);
	},


	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				region			: 'center',
				margin			: '0 0 0 0',
				bodyStyle		: { padding: '5px' },
				items : [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '10 0 0 0', width : '100%',
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom ,
								flex	: 1,
								height	: 65,
								items	: [
									{	text	: '설비명', xtype : 'label', style : 'text-align:left; font-size : 2em !important;', margin : '15 0 0 10'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom + Const.borderLine.right,
								flex	: 3,
								height	: 65,
								items	: [
									{	text	: '', name : 'cvic_name', xtype : 'label', style : 'text-align:left; font-size : 2em !important;', margin : '15 0 0 10'
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0', width : '100%',
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom ,
								flex	: 1,
								height	: 65,
								items	: [
									{	text	: '거래처명', xtype : 'label', style : 'text-align:left; font-size : 2em !important;', margin : '15 0 0 10'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom + Const.borderLine.right,
								flex	: 3,
								height	: 65,
								items	: [
									{	text	: '', name : 'cstm_name', xtype : 'label', style : 'text-align:left; font-size : 2em !important;', margin : '15 0 0 10'
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0', width : '100%',
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom ,
								flex	: 1,
								height	: 65,
								items	: [
									{	text	: '품명', xtype : 'label', style : 'text-align:left; font-size : 2em !important;', margin : '15 0 0 10'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom + Const.borderLine.right,
								flex	: 3,
								height	: 65,
								items	: [
									{	text	: '', name : 'item_name', xtype : 'label', style : 'text-align:left; font-size : 2em !important;', margin : '15 0 0 10'
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0', width : '100%',
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom ,
								flex	: 1,
								height	: 65,
								items	: [
									{	text	: '지시수량', xtype : 'label', style : 'text-align:left; font-size : 2em !important;', margin : '15 0 0 10'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom ,
								flex	: 1,
								height	: 65,
								items	: [
									{	text	: '', name : 'indn_qntt', xtype : 'label', style : 'text-align:left; font-size : 2em !important;', margin : '15 0 0 10'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom ,
								flex	: 1,
								height	: 65,
								items	: [
									{	text	: '생산수량', xtype : 'label', style : 'text-align:left; font-size : 2em !important;', margin : '15 0 0 10'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom + Const.borderLine.right,
								flex	: 1,
								height	: 65,
								items	: [
									{	text	: '', name : 'cnt', xtype : 'label', style : 'text-align:left; font-size : 2em !important;', margin : '15 0 0 10',
										listeners	: {
											render	:function(field){
												var a = 0, pkg_qntt = 1,
													wkod_numb = me.down('[name=wkod_numb]').getValue(),
													wkod_seqn = me.down('[name=wkod_seqn]').getValue()
												;
												if(wkod_numb != ''){
													clearInterval(window.shot5);
													Ext.Ajax.request({
														url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/eis/eisreport/get/plc_cnt.do',
														method		: "POST",
														async		: false,
														params		: {
															token	: _global.token_id,
															param	: Ext.encode({
																invc_numb	: me.down('[name=wkod_numb]').getValue(),
																line_seqn	: me.down('[name=wkod_seqn]').getValue()
															})
														},
														success : function(response, request) {
															var object = response,
																result = Ext.decode(object.responseText)
															;
															if(result.records[0].cnt){
																a = result.records[0].cnt;
															}
														},
														failure : function(response, request) {
															resource.httpError(response);
														},
														callback : function() {
														}
													});
													field.setText(a*me.down('[name=pkg_qntt]').getValue());
													window.shot5 = setInterval(function(){
														Ext.Ajax.request({
															url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/eis/eisreport/get/plc_cnt.do',
															method		: "POST",
															async		: false,
															params		: {
																token	: _global.token_id,
																param	: Ext.encode({
																	invc_numb	: me.down('[name=wkod_numb]').getValue(),
																	line_seqn	: me.down('[name=wkod_seqn]').getValue()
																})
															},
															success : function(response, request) {
																var object = response,
																	result = Ext.decode(object.responseText)
																;
																if(result.records[0].cnt){
																	a = result.records[0].cnt;
																}
															},
															failure : function(response, request) {
																resource.httpError(response);
															},
															callback : function() {
															}
														});
														field.setText(a*me.down('[name=pkg_qntt]').getValue());
													},30000);
												}
											}
										}
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0', width : '100%',
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom ,
								flex	: 1,
								height	: 65,
								items	: [
									{	text	: '작업시간', xtype : 'label', style : 'text-align:left; font-size : 2em !important;', margin : '15 0 0 10'
									}
								]
							},{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top  + Const.borderLine.left + Const.borderLine.bottom + Const.borderLine.right,
								flex	: 3,
								height	: 65,
								items	: [
									{	text	: '', name : 'work_strt_dttm', xtype : 'label', style : 'text-align:left; font-size : 2em !important;', margin : '15 0 0 10'
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0', width : '100%',
						items	: [
							{	xtype	: 'fieldcontainer'  ,
								layout	: { type: 'vbox', align: 'stretch' } ,
								style	: Const.borderLine.top,
								flex	: 1,
								height	: 65,
								items	: [
									{	xtype	: 'button',
										text	: '<span class="btnTemp" style="font-size:2.5em;">상세조회</span>',
										cls		: 'btn btn-primary',
										margin	: 5,
										flex	: 1,
										handler: function() {
											var idcd = me.down('[name=cvic_idcd]').getValue();
											if(idcd != ''){
												me.selectDetail();
											}
										}
									}
								]
							}
						]
					},{xtype : 'textfield', name: 'cvic_idcd', hidden : true
					},{xtype : 'textfield', name: 'c_name', hidden : true
					},{xtype : 'textfield', name: 'wkod_numb', hidden : true
					},{xtype : 'textfield', name: 'wkod_seqn', hidden : true
					},{xtype : 'textfield', name: 'pkg_qntt', hidden : true
					}
				]
			}
		;
		return item;
	},

	selectDetail : function(){
		var me = this,
			cvic_idcd = me.down('[name=cvic_idcd]').getValue(),
			cvic_name = me.down('[name=c_name]').getValue()
		;

		//상세조회 팝업열기
		resource.loadPopup({
			widget	: 'lookup-work-popup',
			params	: {cvic_idcd : cvic_idcd, cvic_name : cvic_name },
		});
	}

});