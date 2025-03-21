var axt ;
Ext.onReady(function() {
	if (!window.console) {
		console = {
			log   : function() {},
			debug : function() {}
		};
	} else {
		if (Ext.isIE) {
			console.debug = function(message) {};
			console.log   = function(message) {};
		}
	}

//  다운로드할때 필요한 iframe을 body안에 삽입
//	var downloadIframe = window.document.createElement('iframe');
//	downloadIframe.setAttribute("id","downloadIframe");
//	downloadIframe.setAttribute("style", "display:none;");
//	document.body.appendChild(downloadIframe);

});

//
Ext.require('Ext.form.field.Base', function() {
	Ext.override(Ext.form.field.Base, {

		setReadOnly : function(readOnly) {
			var me = this, inputEl = me.inputEl;
			readOnly = !!readOnly;
			me[readOnly ? 'addCls' : 'removeCls'](me.readOnlyCls);
			me.readOnly = readOnly;
			if (inputEl) {
				inputEl.dom.readOnly = readOnly;
				inputEl[readOnly ? 'addCls' : 'removeCls']('readonlyfield');
			} else if (me.rendering || inputEl===undefined) {
			    // inputEL이 undefined라면 아직 화면에 그려진적이 없으므로 boxReady이벤트시에
			    // readOnly를 하기위해 true로 바꿔준다.
				// boxReady이벤트는 field component가 최초 한번 초기화되고 화면상에 그려진후에 1회에 한해서 이벤트 발생
				me.setReadOnlyOnBoxReady = true;
			}
			me.fireEvent('writeablechange', me, readOnly);
		}
	});
});

Ext.require('Ext.util.Format', function() {
	Ext.apply(Ext.util.Format, {
		intToBool : function(v) {
			return (v == 1) ? true : false;
		},
		boolToInt : function(v) {
			return (v == 1) ? 1 : 0;
		},

		strToDateYm : function(val) {
			if (!val) {
				return;
			}
			var regExp6 = /^([0-9]{6})/g;
			if (regExp6.test(val)) {
				return val.substring(0, 4) + '-' + val.substring(4, 6);
			} else
			if (val.getMonth) {
				return Ext.util.Format.date(val, 'Y-m');
			}
			return val;
		},

		strToDate : function(val) {
			if (!val) {
				return;
			}
			var regExp8 = /^([0-9]{8})/g;
			var regExp6 = /^([0-9]{6})/g;
			if (regExp8.test(val.trim())) {
				return val.trim().substring(0, 4) + '-' + val.trim().substring(4, 6) + '-'
						+ val.trim().substring(6);
			} else if (regExp6.test(val.trim())) {
				return val.trim().substring(0, 4) + '-' + val.trim().substring(4);
			} else if (val.trim().getMonth) {
				return Ext.util.Format.date(val.trim(), 'Y-m-d');
			}
			return val;
		},
		dateToStr : function(val) {
			if (!val) {
				return '';
			}
			if (val.getMonth) {
				return Ext.util.Format.date(val, 'Ymd');
			} else {
				return val.split('-').join('');
			}
		},
		strToTime : function(val) {
			if (!val) {
				return;
			}
			var regExp4 = /^([0-9]{4})/g;
			if (regExp4.test(val)) {
				return val.substring(0, 2) + ':' + val.substring(2, 4);
			}
			return val;
		},

		timeToStr : function(val) {
			if (!val) {
				return '';
			} else {
				return val.split(':').join('');
			}
		},



		strToDate8 : function(val) {
			if (!val) { return;
			} else {
				var regExp8 = /^([0-9]{8})/g;
				if (regExp8.test(val)) {
					return val.substring(0, 4) + '-' + val.substring(4, 6) + '-' + val.substring(6,8);
				}
				return val;
			}
		},

		date8ToStr : function(val) {
			if (!val) { return '';
			} else {
				if (val.getMonth) {
					return Ext.util.Format.date(val, 'Ymd');
				} else {
					return val.split('-').join('');
				}
			}
		},

		strToTime4 : function(val) {
			if (!val) { return;
			} else {
				var regExp4 = /^([0-9]{4})/g;
				if (regExp4.test(val)) {
					return val.substring(0, 2) + ':' + val.substring(2, 4);
				}
				return val;
			}
		},

		time4ToStr : function(val) {
			if (!val) { return '';
			} else {
				return val.split(':').join('');
			}
		},


		strToDateTime : function(val) { /* 20140101 01:01:13 */
			if (!val) {
				return;
			}
			if ( val.length == 14 ){ /* 20140214010101 년월일시분초 */
				var regExp14 = /^([0-9]{14})/g;
				if (regExp14.test(val)) {
					return val.substring(0, 4) + '-' + val.substring(4, 6) + '-' + val.substring(6, 8) + ' '
					+ val.substring(8, 10) + ':' + val.substring(10, 12) + ':' + val.substring(12, 14) ;
				}
				return val;
			} else
			if ( val.length == 12 ){ /* 201402140101 년월일시분 */
				var regExp12 = /^([0-9]{12})/g;
				if (regExp12.test(val)) {
					return val.substring(0, 4) + '-' + val.substring(4, 6) + '-' + val.substring(6, 8) + ' '
					+ val.substring(8, 10) + ':' + val.substring(10, 12) ;
				}
				return val;
			} else
			if ( val.length == 8 ){ /* 20140214 년월일 */
				var regExp12 = /^([0-9]{8})/g;
				if (regExp12.test(val)) {
					return val.substring(0, 4) + '-' + val.substring(4, 6) + '-' + val.substring(6, 8) ;
				}
				return val;
			}
		},
		dateTimeToStr : function(val) { /* 20140101 01:01:13 */
			if (!val) {
				return;
			}
			if (val.getMonth) {
				return Ext.util.Format.date(val, 'YmdHis');
			} else {
				return val.split('-').join('').split(':').join('').split(' ').join('');
			}
		},

		ZipToStr : function(val) {
			if (!val) {
				return '';
			} else {
				return val.replace(/-/g, '');
			}
		},
		StrToZip : function(val) {
			if (!val) {
				return '';
			} else {
				return (val.replace(/-/g, '')).substring(0, 3) + '-'
						+ (val.replace(/-/g, '')).substring(3, 6);
			}
		},

		/**
		 * Ext.util.Format.number가 마이너스 데이터의경우 천단위 콤마를 표현 못하는 문제 수정
		 */
		number: function(v, formatString) {
	        if (v < 0) {
	            //negative number: flip the sign, format then prepend '-' onto output
	            return '-' + this.originalNumber(v * -1, formatString);
	        } else {
	            //positive number: as you were
	            return this.originalNumber(v, formatString);
	        }
	    },
		originalNumber: Ext.util.Format.number,

	});
});

Ext.require('Ext.form.VTypes', function() {
	Ext.apply(Ext.form.VTypes, {

		// 이메일을 ,구분자로해서 여러개 입력받을수있게 만들었다.
		'email2Text' : '이메일 형식으로만 입력이 가능합니다.</br> ex) test@test.com or test@test.com,test2@test.com',
		'email2Mask' : /[\w.\-@'"!#$%&'*+/=?^_`{|}~,]/i,
		'email2Re' : /^(([.0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2},?){1,}$/,
		'email2' : function(v){
			return this.email2Re.test(v);
		},

		'phoneText' : '전화번호 형식으로만 입력이 가능 합니다.</br> ex) 02-1111-1234',
		'phoneMask' : /[\-\+0-9\(\)\s\.Ext]/,
		'phoneRe'   : /^((\d{2,3})?)(-?)(\d{3,4})(-?)(\d{4})$/,
		'phone'     : function(v) {
			return this.phoneRe.test(v);
		},

		'mobileText' : '휴대전화 형식으로만 입력이 가능 합니다.</br> ex) 010-1111-1234',
		'mobileMask' : /[\-\+0-9\(\)\s\.Ext]/,
		'mobileRe'   : /^(\d{2,3})(-?)(\d{3,4})(-?)(\d{4})$/,
		'mobile'     : function(v) {
			return this.mobileRe.test(v);
		},

		'faxText' : 'FAX번호 형식으로만 입력이 가능 합니다.</br> ex) 0200-1111-1234',
		'faxMask' : /[\-\+0-9\(\)\s\.Ext]/,
		'faxRe'   : /(\d{2,3})(-?)(\d{3,4})(-?)(\d{4})/,
		'fax'     : function(v) {
			return this.faxRe.test(v);
		},

		// REGEX_MOBILE : /(\d{3})(-?)(\d{3,4})(-?)(\d{4})/,

		'numberText' : '숫자만 입력이 가능 합니다.',
		'numberMask' : /^\d+$/,
		'numberRe' : /^\d+$/,
		'number' : function(v) {
			return this.numberRe.test(v);
		},

		'zipcodeText' : '우편번호 형식으로만 입력이 가능 합니다.</br> ex) 111-111',
		'zipcodeMask' : /[\-\+0-9\(\)\s\.Ext]/,
		'zipcodeRe' : /^\d{3}-\d{3}$/, // /(\d{3})(-?)(\d{3})/, 참조 :
										// http://blog.naver.com/yukpan12?Redirect=Log&logNo=100195683886
		'zipcode' : function(v) {
			return this.zipcodeRe.test(v);
		},

		'biznoText' : '사업자번호 형식으로만 입력이 가능 합니다.</br> ex) 000-00-00000',
		'biznoMask' : /[\-\+0-9\(\)\s\.Ext]/,
		'biznoRe' : /^\d{3}-\d{2}-\d{5}$/,
		'bizno' : function(v) {
			return this.biznoRe.test(v);
		},

		'bonsaText' : '본사코드 형식으로만 입력이 가능 합니다.</br> ex) N1010BONSA',
		'bonsaMask' : /[0-9A-Z]/,
		'bonsaRe' : /^[A-Z]{1}\d{4}[A-Z]{5}$/,
		'bonsa' : function(v) {
			return this.bonsaRe.test(v);
		},

		'ipText' : 'IP형식으로만 입력이 가능 합니다.</br> ex) xxx.xxx.xxx.xxx or<br/> xxx.xxx.xxx.xxx/xx <br/> /xx(mask bit)는 8~32까지<br/> 개행해서 여러IP입력도 가능합니다.',
		'ipMask' : /[\/\.0-9\r\n]/, // textfield에 입력 가능한 형식 ( / or . or 숫자 )
		'ipRe'   : /^(([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}(\/(([1-9])|([1-2][0-9])|(3[0-2])))?(\n)?){1,}$/,
		'ip'     : function(v) {
			var valueArr = v.split(/\n/g);
			for(var i=0,size=valueArr.length; i<size; i++) {
				if( valueArr[i].length > 60 ) {
					return false;
				}
			}
			return this.ipRe.test(v);
		},
		//'ipemailRe'   : /^(([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}(\/(([1-9])|([1-2][0-9])|(3[0-2])))?(\n)?){1,}$/,
		'domainText' : 'IP또는 Domain형식으로만 입력이 가능 합니다.</br> ex) xxx.xxx.xxx.xxx or<br/> www.xxx.com <br/>',
		'domainMask' : /[\/\:\.0-9a-zA-Z\r\n]/, // textfield에 입력 가능한 형식 ( / or . or 숫자 )
		'domainRe' : /^((https?:\/\/)?((([a-z\d](([a-z\d-]*[a-z\d]))|([ㄱ-힣])*)\.)+(([a-zㄱ-힣]{2,}))|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?(\n)?){1,}$/,
		'domain'     : function(v) {
			var valueArr = v.split(/\n/g);
			for(var i=0,size=valueArr.length; i<size; i++) {
				if( valueArr[i].length > 60 ) {
					return false;
				}
			}
			if(this.ipRe.test(v) || this.domainRe.test(v)) {
				return true;
			} else {
				return false;
			}
		},

		'numericText' : '숫자만 입력 가능합니다.',
		'numericMask' : /[0-9]/,
		'numericRe'   : /[0-9]/,
		'numeric'     : function(v){
		    return this.numericRe.test(v);
		},

		'portText' : '0 ~ 65535의 숫자만 입력 가능합니다.',
		'portMask' : /[0-9]/,
		'port'     : function(v){
			if(v>=0 && v<=65535) {
				return true;
			} else {
				return false;
			}
		}
	});
});
//
Ext.require('Ext.data.writer.Json',	function() {
	Ext.data.writer.Json.override({
		getRecordData : function(record) {

			var me = this,
				i,
				association,
				childStore,
				data = {},
				datas = [],
				toInsert, toUpdate, toDelete
				;

			data = me.callParent([ record ]);
			for (i = 0; i < record.associations.length; i++) {
				association = record.associations.get(i);
				if (association.type == 'hasMany') {
					data[association.name] = [];
					childStore = eval('record.'+ association.name + '()');
					toInsert = childStore.getNewRecords(),
					toUpdate = childStore.getUpdatedRecords(),
					toDelete = childStore.getRemovedRecords();


					if (toDelete.length > 0) {Ext.each(toDelete,function(record) {record.data._set = 'delete'; data[association.name].push(me.getRecordData.call(me,record));});}
					if (toInsert.length > 0) {Ext.each(toInsert,function(record) {record.data._set = 'insert'; data[association.name].push(me.getRecordData.call(me,record));});}
					if (toUpdate.length > 0) {Ext.each(toUpdate,function(record) {record.data._set = 'update'; data[association.name].push(me.getRecordData.call(me,record));});}


//					if (toDelete.length > 0) {Ext.each(toDelete,function(record) {record.set('_set','delete');data[association.name].push(me.getRecordData.call(me,record));});}
//					if (toInsert.length > 0) {Ext.each(toInsert,function(record) {record.set('_set','insert');data[association.name].push(me.getRecordData.call(me,record));});}
//					if (toUpdate.length > 0) {Ext.each(toUpdate,function(record) {record.set('_set','update');data[association.name].push(me.getRecordData.call(me,record));});}
				}
			}
			return data;
		}
	});
});

// /**
// * 서버에서 가져온 데이터로 summary를 표현하기 위해 Summary클래스의 remoteRoot속성을 사용했지만<br/>
// * 작동하지 않아서 Axt.data.Store의 defaultProxy를 수정하고 이 클래스를 override했다.
// */
// Ext.require( 'Ext.grid.feature.Summary', function (){
// Ext.grid.feature.Summary.override({
// dock : 'bottom',
// remoteRoot : undefined,
//
// getSummary: function(store, type, field, group) {
// var me = this;
// if (me.remoteRoot) {
// var reader = store.proxy.reader;
// if (this.remoteRoot && reader.rawData) {
// summaryRow = reader.summary ; // .result[this.remoteRoot];
// //reader.getRoot(reader.rawData);
// if(summaryRow) {
// if (type){
// if (type == 'count' ) {
// if (typeof summaryRow['maxsize'] != 'undefined') {
// return 'T : ' + summaryRow['maxsize'];
// }
// } else {
// if (typeof summaryRow[field] != 'undefined') {
// return summaryRow[field];
// }
// }
// }
// }
// return '';
// } else {
// return this.callParent(arguments);
// }
// } else {
// return this.callParent(arguments);
// }
// }
//
// // getSummary: function(store, type, field, group) {
// // var reader = store.proxy.reader;
// // if (this.remoteRoot && reader.rawData) {
// // summaryRow =reader.result[this.remoteRoot];
// //reader.getRoot(reader.rawData);
// // if(summaryRow) {
// // if (typeof summaryRow[field] != 'undefined') {
// // return summaryRow[field];
// // }
// // }
// //
// // return '';
// // }
// // return this.callParent(arguments);
// // },
// //
// // refresh: function(data) {
// // var me = this;
// // var view = me.view;
// // var store = view.store;
// //
// // // store proxy reader에 변수로 정의되어있던 remoteRoot에 임의의 데이터 결합
// //
// // if(Ext.isEmpty(store.getProxy().getReader().result)) {
// // store.getProxy().getReader().result = {};
// // }
// //
// // Ext.apply(store.getProxy().getReader().result[this.remoteRoot]||{}, data);
// //
// // // summary의 view부분 갱신
// // view.refresh();
// // }
//
// });
// });

/**
 *
 * Javascript정규식 패턴들 모아모아 JQuery(mobile),HTML5 by 가이아 2011/09/23 13:12
 * openyou.egloos.com/2846636
 *
 * Date Format (m/d/y) ^([\d]|1[0,1,2])/([0-9]|[0,1,2][0-9]|3[0,1])/\d{4}$
 * 12/21/2005 Decimal Number ^\d*[0-9](\.\d*[0-9])?$ 234.342 Document Filenames
 * ^[a-zA-Z0-9-_\.]+\.(pdf|txt|doc|csv)$ world-domination.pdf E-mail Address
 * ^([0-9a-zA-Z]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})+$
 * HTML Color Codes ^#?([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?$ #00ccff
 * Image Filenames ^[a-zA-Z0-9-_\.]+\.(jpg|gif|png)$ new-pic_company.jpg IP
 * Address
 * ^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$
 * 192.168.0.1 Multimedia Filenames
 * ^[a-zA-Z0-9-_\.]+\.(swf|mov|wma|mpg|mp3|wav)$ company-presentation.swf MySQL
 * Date Format ^\d{4}-(0[0-9]|1[0,1,2])-([0,1,2][0-9]|3[0,1])$ 2005-09-02 Phone
 * Number ^[2-9]\d{2}-\d{3}-\d{4}$ 250-555-4542 Postal Code (CAD)
 * ^([A-Z][0-9]){3}$ V2B2S3 Time Format (HH:MM)
 * ^([0-1][0-9]|[2][0-3])(:([0-5][0-9])){1,2}$ 12:29 URL
 * ^(http[s]?://|ftp://)?(www\.)?[a-zA-Z0-9-\.]+\.(com|org|net|mil|edu|ca|co.uk|com.au|gov)$
 * Versatile Phone Number ^(([0-9]{1})*[- .(]*([0-9a-zA-Z]{3})*[-
 * .)]*[0-9a-zA-Z]{3}[- .]*[0-9a-zA-Z]{4})+$ 1.245.532.3422
 *
 *
 * Credit Card Number [0-9]{13,16} Diners Club Card ^([30|36|38]{2})([0-9]{12})$
 * ICQ UIN ([1-9])+(?:-?\d){4,} Alpha-Numeric ^[a-zA-Z0-9]+$ Domain like
 * "abc.de" ^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$
 * IPv4 Address ((^|\.)((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]?\d))){4}$ IPv6
 * Address ((^|:)([0-9a-fA-F]{0,4})){1,8}$ Username with 2-20 chars (format:
 * string+string|number) ^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$ Password (UpperCase,
 * LowerCase and Number) ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$ Password
 * (UpperCase, LowerCase, Number/SpecialChar and min 8 Chars)
 * (?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$ American
 * Postal Code (format is nnnnn or nnnnn-nnnn) (\d{5}([\-]\d{4})?) Canadian
 * Postal Code (Format: A0A 0A0) ^([A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9])$
 * Australia Postal Code (Format: nnnn) ^[0-9]{4}$ Austrian Postal Code (Format:
 * nnnn) ^[0-9]{4}$ Hungarian Postal Code (Format: nnnn) ^[0-9]{4}$ German
 * Postal Code (Format: nnnnn) ^[0-9]{5}$ Swedish Postal Code (Format: nnnnn)
 * ^[0-9]{5}$ Japanese Postal Code (Format: nnn-nnnn) ^\d{3}-\d{4}$ Spanish
 * Postal Code (Format: 01xxx to 50xxx) ((0[1-9]|5[0-2])|[1-4][0-9])[0-9]{3}
 * Dutch Postal Code (Format: 1234 aa) ^[1-9][0-9]{3}\s?[a-zA-Z]{2}$ Date
 * (Format: YYYY-MM-DD) [0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])
 * Full Date Validation (YYYY-MM-DD)
 * (?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))
 * Date (Format: MM/DD/YYYY) (0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[-
 * /.](19|20)\d\d Full date validation (MM/DD/YYYY) (?:(?:0[1-9]|1[0-2])[\/\\-.
 * ]?(?:0[1-9]|[12][0-9])|(?:(?:0[13-9]|1[0-2])[\/\\-.
 * ]?30)|(?:(?:0[13578]|1[02])[\/\\-. ]?31))[\/\\-. ]?(?:19|20)[0-9]{2} Latitude
 * or Longitude -?\d{1,3}\.\d+ Price (Format: 1.00) \d+(\.\d{2})? Price (Format:
 * 1,00) \d+(,\d{2})? Phone Number (Format: +99(99)9999-9999)
 * [\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4} Integers with or without decimals
 * (Format: 9 or 9.9) \-?\d+(\.\d{0,})? UUID
 * ^[0-9A-Fa-f]{8}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{12}$
 *  * 휴대폰번호 정규식 ** var rgEx = /[01](0|1|6|7|8|9)[-](\d{4}|\d{3})[-]\d{4}$/g; var
 * OK = rgEx.exec(target.value)
 *
 * 설명을 하자면 [01] : 반드시 앞에 01이 와야 한다. (0|1|6|7|8|9) : 0 또는 1 또는 6 또는 ....9 가 와야
 * 한다. [-] : 하이튼이 와야 한다. \d{4} : 4자리의 숫자 표현식이 와야 한다. $ : 문자열의 끝. g : 문자열 전체를
 * 검사한다는 뜻. ********************************
 */

Ext.onReady(function() {
	/**
	 * Controller에 설정 된 이벤트 제거
	 */
	Ext.override(Ext.app.EventBus, {
		uncontrol : function(controllerArray) {
			var me = this, bus = me.bus, deleteThis, idx;

			Ext.iterate(bus, function(ev, controllers) {
				Ext.iterate(controllers, function(query, controller) {
					deleteThis = false;

					Ext.iterate(controller, function(controlName) {
						idx = controllerArray.indexOf(controlName);

						if (idx >= 0) {
							deleteThis = true;
						}
					});

					if (deleteThis) {
						delete controllers[query];
					}
				});
			});
		}
	});
});
