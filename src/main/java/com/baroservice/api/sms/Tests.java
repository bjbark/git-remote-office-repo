package com.baroservice.api.sms;

import java.rmi.RemoteException;

import com.baroservice.api.BarobillApiProfile;
import com.baroservice.api.BarobillApiService;
import com.baroservice.ws.SMSMessage;
import com.baroservice.ws.XMSMessage;

/**
 * 바로빌 문자 API 샘플
 */
public class Tests {

    /**
     * 바로빌 API 정의 클래스
     * <p>
     * 환경에 따라 BarobillApiProfile 를 지정해주세요.
     */
    private BarobillApiService barobillApiService;

    public Tests() {
        barobillApiService = new BarobillApiService(BarobillApiProfile.TESTBED);
    }

    /**
     * SendMessage - 문자(SMS/LMS) 발송
     */

    public void SendMessage(String key,String num,String id, String name, String from , String to , String content ) throws RemoteException {

        String certKey = key;            // 인증키
        String corpNum = num;            // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String senderId = id;            // 연계사업자 담당자 아이디
        String fromNumber = from;            // 발신번호
        String toName = name;                // 수신자명
        String toNumber = to;            // 수신번호
        String contents = content;            // 내용
        String sendDt = "";                // 전송일시 (yyyyMMddHHmmss 형식) (빈 문자열 입력시 즉시 전송, 미래일자 입력시 예약 전송)
        String refKey = "WSINFOTECH";                // 연동사부여 전송키

        String result = barobillApiService.sms.sendMessage(certKey, corpNum, senderId, fromNumber, toName, toNumber, contents, sendDt, refKey);

        System.out.println(result);

    }

    /**
     * SendSMSMessage - 단문(SMS) 발송
     */

    public void SendSMSMessage() throws RemoteException {

        String certKey = "";            // 인증키
        String corpNum = "";            // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String senderId = "";        // 연계사업자 담당자 아이디
        String fromNumber = "";        // 발신번호
        String toName = "";            // 수신자명
        String toNumber = "";        // 수신번호
        String contents = "";        // 내용
        String sendDt = "";            // 전송일시 (yyyyMMddHHmmss 형식) (빈 문자열 입력시 즉시 전송, 미래일자 입력시 예약 전송)
        String refKey = "";            // 연동사부여 전송키

        String result = barobillApiService.sms.sendSMSMessage(certKey, corpNum, senderId, fromNumber, toName, toNumber, contents, sendDt, refKey);

        System.out.println(result);

    }

    /**
     * SendLMSMessage - 장문(LMS) 발송
     */

    public void SendLMSMessage() throws RemoteException {

        String certKey = "";            // 인증키
        String corpNum = "";         // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String senderId = "";        // 연계사업자 담당자 아이디
        String fromNumber = "";      // 발신번호
        String toName = "";          // 수신자명
        String toNumber = "";        // 수신번호
        String subject = "";         // 제목
        String contents = "";        // 내용
        String sendDt = "";          // 전송일시 (yyyyMMddHHmmss 형식) (빈 문자열 입력시 즉시 전송, 미래일자 입력시 예약 전송)
        String refKey = "";          // 연동사부여 전송키

        String result = barobillApiService.sms.sendLMSMessage(certKey, corpNum, senderId, fromNumber, toName, toNumber, subject, contents, sendDt, refKey);

        System.out.println(result);

    }

    /**
     * SendMMSMessageFromFTP - 포토(MMS) 발송 (FTP)
     */

    public void SendMMSMessageFromFTP() throws RemoteException {

        String certKey = "";           // 인증키
        String corpNum = "";        // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String senderId = "";       // 연계사업자 담당자 아이디
        String fromNumber = "";     // 발신번호
        String toName = "";         // 수신자명
        String toNumber = "";       // 수신번호
        String subject = "";        // 제목
        String contents = "";       // 내용
        String fileName = "";       // 전송할 파일명
        String sendDt = "";         // 전송일시 (yyyyMMddHHmmss 형식) (빈 문자열 입력시 즉시 전송, 미래일자 입력시 예약 전송)
        String refKey = "";         // 연동사부여 전송키

        String result = barobillApiService.sms.sendMMSMessageFromFTP(certKey, corpNum, senderId, fromNumber, toName, toNumber, subject, contents, fileName, sendDt, refKey);

        System.out.println(result);

    }

    /**
     * SendMessages - 다량전송
     */

    public void SendMessages() throws RemoteException {

        String certKey = "";            //인증키
        String corpNum = "";            //연계사업자 사업자번호 ('-' 제외, 10자리)
        String senderId = "";           //연계사업자 담당자 아이디
        int sendCount = 2;                //전송건수
        boolean cutToSms = false;        //90 byte 보다 긴 내용의 문자인 경우 SMS 로 잘라서 전송할지 여부

        XMSMessage[] messages = new XMSMessage[sendCount];        //메세지 정보 배열
        messages[0] = new XMSMessage();
        messages[0].setMessage("");
        messages[0].setSenderNum("");
        messages[0].setReceiverNum("");
        messages[0].setReceiverName("");
        messages[1] = new XMSMessage();
        messages[1].setMessage("");
        messages[1].setSenderNum("");
        messages[1].setReceiverNum("");
        messages[1].setReceiverName("");

        String sendDt = "";             //전송일시 (yyyyMMddHHmmss 형식) (빈 문자열 입력시 즉시 전송, 미래일자 입력시 예약 전송)

        String result = barobillApiService.sms.sendMessages(certKey, corpNum, senderId, sendCount, cutToSms, messages, sendDt);

        System.out.println(result);

    }

    /**
     * CancelReservedSMSMessage - 예약 전송취소
     */

    public void CancelReservedSMSMessage() throws RemoteException {
        String certKey = "";           // 인증키
        String corpNum = "";        // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String sendKey = "";        // 바로빌부여 전송키

        int result = barobillApiService.sms.cancelReservedSMSMessage(certKey, corpNum, sendKey);

        System.out.println(result);
    }

    /**
     * GetSMSSendState - 문자 전송 상태 (바로빌부여 전송키)
     */

    public void GetSMSSendState() throws RemoteException {
        String certKey = "";           // 인증키
        String corpNum = "";           // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String sendKey = "";           // 바로빌부여 전송키

        int result = barobillApiService.sms.getSMSSendState(certKey, corpNum, sendKey);

        System.out.println(result);

    }

    /**
     * GetSMSSendMessage - 문자 메시지 확인 (바로빌부여 전송키)
     */

    public void GetSMSSendMessage() throws RemoteException {

        String certKey = "";           // 인증키
        String corpNum = "";           // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String sendKey = "";           // 바로빌부여 전송키

        SMSMessage result = barobillApiService.sms.getSMSSendMessage(certKey, corpNum, sendKey);

        System.out.println(result);

    }

    /**
     * GetSMSSendMessages - 문자 메시지 대량 확인 (바로빌부여 전송키)
     */

    public void GetSMSSendMessages() throws RemoteException {

        String certKey = "";            //인증키
        String corpNum = "";            //연계사업자 사업자번호 ('-' 제외, 10자리)

        String[] sendKeyList = new String[2];    //바로빌부여 전송키 배열
        sendKeyList[0] = "";
        sendKeyList[1] = "";

        SMSMessage[] result = barobillApiService.sms.getSMSSendMessages(certKey, corpNum, sendKeyList);

        System.out.println(result);

    }

    /**
     * GetSMSSendMessagesByRefKey - 문자 메시지 확인 (연동사부여 전송키)
     */

    public void GetSMSSendMessagesByRefKey() throws RemoteException {

        String certKey = "";            // 인증키
        String corpNum = "";            // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String refKey = "";            // 연동사부여 전송키

        SMSMessage[] result = barobillApiService.sms.getSMSSendMessagesByRefKey(certKey, corpNum, refKey);

        System.out.println(result);

    }

    /**
     * GetMessagesByReceiptNum - 다량전송 내역 확인 (바로빌 다량전송키)
     */

    public void GetMessagesByReceiptNum() throws RemoteException {

        String certKey = "";            // 인증키
        String corpNum = "";            // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String receiptNum = "";         // 바로빌부여 다량전송키

        SMSMessage[] result = barobillApiService.sms.getMessagesByReceiptNum(certKey, corpNum, receiptNum);

        System.out.println(result);

    }

    /**
     * GetSMSHistoryURL - 문자 전송내역 URL
     */

    public void GetSMSHistoryURL() throws RemoteException {

        String certKey = "";        // 인증키
        String corpNum = "";        // 바로빌 회원 사업자번호 ('-' 제외, 10자리)
        String id = "";             // 연계사업자 담당자 아이디
        String pwd = "";            // 연계사업자 담당자 비밀번호

        String result = barobillApiService.sms.getSMSHistoryURL(certKey, corpNum, id, pwd);

        System.out.println(result);

    }

}
