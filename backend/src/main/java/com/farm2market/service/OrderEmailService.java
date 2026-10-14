package com.farm2market.service;

import com.farm2market.entity.Order;
import com.farm2market.entity.OrderItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnProperty(prefix = "spring.mail", name = "host")
public class OrderEmailService {
    private final JavaMailSender mailSender;
    private final String recipient;
    private final String senderAddress;

    public OrderEmailService(JavaMailSender mailSender,
            @Value("${farm2market.orders.email:parthegaurav98@gmail.com}") String recipient,
            @Value("${spring.mail.username:}") String senderAddress) {
        this.mailSender = mailSender;
        this.recipient = recipient;
        this.senderAddress = senderAddress;
    }

    public void sendOrderNotice(Order order) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipient);
        if (!senderAddress.isBlank()) message.setFrom(senderAddress);
        message.setSubject("Farm2Market order #" + order.getId() + " received");
        StringBuilder body = new StringBuilder()
                .append("A new order was placed on Farm2Market.\n\n")
                .append("Order: #").append(order.getId()).append("\n")
                .append("Buyer: ").append(order.getBuyer().getName()).append(" (")
                .append(order.getBuyer().getEmail()).append(")\n")
                .append("Delivery address: ").append(order.getDeliveryLocation()).append("\n\n")
                .append("Items:\n");
        for (OrderItem item : order.getItems()) {
            body.append("- ").append(item.getProduct().getName()).append(" × ")
                    .append(item.getQuantity()).append(" @ ₹").append(item.getPrice())
                    .append(" = ₹").append(item.getSubtotal()).append("\n");
        }
        body.append("\nTotal: ₹").append(order.getTotalAmount());
        message.setText(body.toString());
        mailSender.send(message);
    }
}
